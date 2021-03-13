import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { ProjectController } from './controllers/project.controller';
import { ProjectEntity } from './entities/project.entity';
import { ProjectService } from './services/project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    forwardRef(() => UserModule),
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
