import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDTO } from '../dto/create-project.dto';
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
      const project = this.projectRepository.create({
        name: payload.name,
        languageId: payload.languageId,
        userId,
      });
      return await this.projectRepository.save(project);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAllProject(userId: number): Promise<ProjectEntity[]> {
    try {
      const projects: ProjectEntity[] = await this.projectRepository.find({
        where: {
          userId,
        },
        relations: ['user', 'language'],
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
}
