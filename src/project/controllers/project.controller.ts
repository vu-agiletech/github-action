import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseOk } from 'src/response';
import { ProjectService } from '../services/project.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({
    summary: 'get one language with id',
  })
  @Get(':id')
  async getOneLanguageById(@Param('id') id: number): Promise<ResponseOk> {
    const result = await this.projectService.findOneProjectById(id);
    return {
      status: true,
      data: result,
    };
  }
}
