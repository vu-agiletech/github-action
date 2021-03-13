import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserRole } from 'src/common/constant/role.constant';
import { Roles } from 'src/common/decorator/role.decorator';
import { CurrentUser, UserRequest } from 'src/common/decorator/user.decorator';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';
import { ResponseOk } from 'src/response';
import { ProjectEntity } from '../entities/project.entity';
import { ProjectService } from '../services/project.service';
import { CreateProjectDTO } from '../dto/create-project.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiHeader({
  name: 'xattack',
})
@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  async projectResponse(
    data: Record<string, ProjectEntity | any>,
  ): Promise<ResponseOk> {
    return {
      ...data,
      userId: undefined,
      languageId: undefined,
      user: undefined,
      author: data.user?.username,
      language: data.language?.language,
    };
  }
  @ApiOperation({
    summary: 'create project',
  })
  @Roles(UserRole.USER)
  @Post()
  async createProject(
    @CurrentUser() user: UserRequest,
    @Body() payload: CreateProjectDTO,
  ): Promise<ResponseOk> {
    const project: ProjectEntity = await this.projectService.createProject(
      user.id,
      payload,
    );
    return project;
  }

  @ApiOperation({
    summary: 'get projects',
  })
  @Roles(UserRole.USER)
  @Get()
  async getProjects(@CurrentUser() user: UserRequest): Promise<ResponseOk> {
    const projects: ProjectEntity[] = await this.projectService.findAllProject(
      user.id,
    );
    return Promise.all(
      projects.map((project: ProjectEntity) => {
        return this.projectResponse(project);
      }),
    );
  }

  @Roles(UserRole.USER)
  @ApiOperation({
    summary: 'get one project with id',
  })
  @Get(':id')
  async getProjectById(@Param('id') id: number): Promise<ResponseOk> {
    const result: ResponseOk = await this.projectService.findOneProjectById(id);
    return await this.projectResponse(result);
  }
}
