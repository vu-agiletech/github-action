import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
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
import { UpdateProjectDTO } from '../dto/update-project.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiHeader({
  name: 'xattack',
})
@ApiTags('Projects')
@Roles(UserRole.ADMIN, UserRole.USER)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  async projectResponse(
    data: Record<string, ProjectEntity | any>,
  ): Promise<ResponseOk> {
    return {
      ...data,
      userId: undefined,
      user: undefined,
      author: data.user?.username,
      language: data.language?.language,
    };
  }

  @ApiOperation({
    summary: 'create project',
  })
  @Post()
  async createProject(
    @CurrentUser() user: UserRequest,
    @Body() payload: CreateProjectDTO,
  ): Promise<ResponseOk> {
    const project: ProjectEntity = await this.projectService.createProject(
      user.id,
      payload,
    );
    return await this.projectResponse(project);
  }

  @ApiOperation({
    summary: 'get projects',
    description: 'get all user languageId = 0 and filter languageId != 0',
  })
  @Get()
  async getProjects(
    @CurrentUser() user: UserRequest,
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('languageId') languageId: string,
  ): Promise<ResponseOk> {
    let projects: ResponseOk = [];
    if (languageId !== '0') {
      projects = await this.projectService.filterProject(user.id, {
        page,
        size,
        languageId: Number(languageId),
      });
    } else {
      projects = await this.projectService.findAllProject(user.id, page, size);
    }
    return Promise.all(
      projects.map((project: ProjectEntity) => {
        return this.projectResponse(project);
      }),
    );
  }

  @ApiOperation({
    summary: 'get one project with id',
  })
  @Get(':id')
  async getProjectById(@Param('id') id: number): Promise<ResponseOk> {
    const result: ResponseOk = await this.projectService.findOneProjectById(id);
    return await this.projectResponse(result);
  }

  @ApiOperation({
    summary: 'update one project with id',
  })
  @Put(':id')
  async updateProjectById(
    @Param('id') id: number,
    @Body() payload: UpdateProjectDTO,
  ): Promise<ResponseOk> {
    const result: ResponseOk = await this.projectService.updateOneById(
      id,
      payload,
    );
    return await this.projectResponse(result);
  }

  @ApiOperation({
    summary: 'update one project with id',
  })
  @Delete(':id')
  async deletProjectById(@Param('id') id: number): Promise<ResponseOk> {
    const result: ResponseOk = await this.projectService.deleteOneById(id);
    return result;
  }
}
