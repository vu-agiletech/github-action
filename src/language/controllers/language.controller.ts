import {
  Controller,
  Param,
  Get,
  Put,
  Delete,
  Body,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseOk } from 'src/response';
import { LanguageCreateDTO } from '../dto/language-create.dto';
import { UpdateLanguageDTO } from '../dto/language-update.dto';
import { LanguageEntity } from '../entities/language.entity';
import { LanguageService } from '../services/language.service';

@ApiHeader({
  name: 'xattack',
  required: true,
})
@ApiTags('Languages')
@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @ApiOperation({
    summary: 'Create one language',
  })
  @Get()
  async getLanguages(
    @Query('size', ParseIntPipe) size: number,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<ResponseOk[]> {
    const result: LanguageEntity[] = await this.languageService.findAllLanguages(
      size,
      page,
    );
    return result;
  }
  @ApiOperation({
    summary: 'Create one language',
  })
  @Post()
  async create(@Body() payload: LanguageCreateDTO): Promise<ResponseOk> {
    const result: LanguageEntity = await this.languageService.createOneLanguage(
      payload,
    );
    return result;
  }

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
