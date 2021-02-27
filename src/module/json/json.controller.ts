import { Controller, Param, ParseIntPipe, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JsonService } from './json.service';

@ApiTags('Json')
@Controller('jsons')
export class JsonController {
  constructor(private readonly jsonService: JsonService) {}

  @Get()
  @ApiOperation({
    summary: 'find all json',
  })
  async findALlJson() {
    return await this.jsonService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'find all json',
  })
  async findOneJson(@Param('id', ParseIntPipe) id: number) {
    return await this.jsonService.findOne(id);
  }
}
