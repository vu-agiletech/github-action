import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pagination } from 'src/common/utils';
import { Repository } from 'typeorm';
import { CreateProjectDTO } from '../dto/create-project.dto';
import { UpdateProjectDTO } from '../dto/update-project.dto';
import { ProjectEntity } from '../entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  async createProject(
    userId: number,
    payload: CreateProjectDTO,
  ): Promise<ProjectEntity> {
    try {
      const project: ProjectEntity = this.projectRepository.create({
        name: payload.name,
        languageId: payload.languageId,
        userId,
      });
      await this.projectRepository.save(project);
      const result: ProjectEntity = await this.projectRepository.findOne({
        where: {
          id: project.id,
        },
        relations: ['user', 'language'],
      });
      return result;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async filterProject(
    userId: number,
    filter: { size: number; page: number; languageId: number },
  ): Promise<ProjectEntity[]> {
    const [offset, limit] = pagination(filter.page, filter.size);
    try {
      const project: ProjectEntity[] = await this.projectRepository.find({
        where: {
          userId,
          languageId: filter.languageId,
        },
        relations: ['user', 'language'],
        take: limit,
        skip: offset,
      });
      return project;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findAllProject(
    userId: number,
    page: number,
    size: number,
  ): Promise<ProjectEntity[]> {
    const [offset, limit] = pagination(page, size);
    try {
      const projects: ProjectEntity[] = await this.projectRepository.find({
        where: {
          userId,
        },
        relations: ['user', 'language'],
        take: limit,
        skip: offset,
      });
      return projects;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findOneProjectById(id: number): Promise<ProjectEntity> {
    const project = await this.projectRepository.findOne({
      where: {
        id,
      },
      relations: ['user', 'language'],
    });
    if (!project) {
      throw new NotFoundException();
    }
    return project;
  }

  async updateOneById(
    id: number,
    payload: UpdateProjectDTO,
  ): Promise<ProjectEntity> {
    try {
      await this.projectRepository.update(id, payload);
      const project = await this.projectRepository.findOne({
        where: {
          id,
        },
        relations: ['user', 'language'],
      });
      return project;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async deleteOneById(id: number): Promise<{ status: boolean }> {
    try {
      await this.projectRepository.delete({ id });
      return {
        status: true,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
