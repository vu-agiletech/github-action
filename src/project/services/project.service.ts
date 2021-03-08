import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  async findOneProjectById(id: number): Promise<ProjectEntity> {
    const project = await this.projectRepository.findOne({ id });
    if (!project) {
      throw new NotFoundException();
    }
    return project;
  }
}
