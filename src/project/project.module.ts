import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './controllers/project.controller';
import { ProjectEntity } from './entities/project.entity';
import { ProjectService } from './services/project.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
