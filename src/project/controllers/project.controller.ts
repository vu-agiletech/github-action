import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/role.decorator';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';
import { ResponseOk } from 'src/response';
import { UserRole } from 'src/user/dto/create-user.dto';
import { ProjectService } from '../services/project.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(UserRole.USER)
@ApiHeader({
  name: 'xattack',
})
@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({
    summary: 'get one language with id',
  })
  @Get(':id')
  async getProjectById(@Param('id') id: number): Promise<ResponseOk> {
    const result = await this.projectService.findOneProjectById(id);
    return {
      status: true,
      data: result,
    };
  }
}
