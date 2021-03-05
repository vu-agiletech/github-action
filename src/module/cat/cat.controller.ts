import {
  Get,
  Put,
  Param,
  ParseIntPipe,
  Controller,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CatService } from './cat.service';
import { CatDTO } from './dto/cat.dto';
import { CatEntity } from './entities/cat.entity';

@ApiTags('Cats')
@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  async getAll(): Promise<CatEntity[]> {
    return await this.catService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<CatEntity> {
    return await this.catService.findOne(id);
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CatDTO,
  ): Promise<CatEntity> {
    return await this.catService.updateOne(id, payload);
  }
}
