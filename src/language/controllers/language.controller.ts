import {
  Controller,
  Param,
  Get,
  Put,
  Delete,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseOk } from 'src/response';
import { UpdateLanguageDTO } from '../dto/language-update.dto';
import { LanguageEntity } from '../entities/language.entity';
import { LanguageService } from '../services/language.service';

@ApiTags('Languages')
@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @ApiOperation({
    summary: 'Get one language by id',
  })
  @Get(':id')
  async getOneLanguageById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseOk> {
    const result: LanguageEntity = await this.languageService.findLanguageById(
      id,
    );
    return result;
  }

  @ApiOperation({
    summary: 'Update one language by id',
  })
  @Put(':id')
  async updateOneLanguageById(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateLanguageDTO,
  ): Promise<ResponseOk> {
    const result: LanguageEntity = await this.languageService.updateLanguageById(
      id,
      payload,
    );
    return result;
  }

  @ApiOperation({
    summary: 'Delete one language',
  })
  @Delete(':id')
  async deleteOneLanguageById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseOk> {
    await this.languageService.deleteLanguageById(id);
    return {
      status: true,
    };
  }
}
