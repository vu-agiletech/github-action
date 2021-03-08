import { Controller, Param, Get, Put, Delete, Body } from '@nestjs/common';
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
    summary: 'Get one language',
  })
  @Get(':id')
  async getOneLanguageById(@Param('id') id: number): Promise<ResponseOk> {
    const result: LanguageEntity = await this.languageService.findLanguageById(
      id,
    );
    return result;
  }

  @ApiOperation({
    summary: 'Update one language',
  })
  @Put(':id')
  async updateOneLanguageById(
    @Param('id') id: number,
    @Body() payload: UpdateLanguageDTO,
  ): Promise<ResponseOk> {
    return await this.languageService.updateLanguageById(id, payload);
  }

  @ApiOperation({
    summary: 'Delete one language',
  })
  @Delete(':id')
  async deleteOneLanguageById(@Param('id') id: number): Promise<ResponseOk> {
    return await this.languageService.deleteLanguageById(id);
  }
}
