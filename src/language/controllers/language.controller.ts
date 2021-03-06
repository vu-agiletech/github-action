import { Controller, Param, Get, Put, Delete, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateLanguageDTO } from '../dto/language-update.dto';
import { LanguageService } from '../services/language.service';

@ApiTags('Languages')
@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @ApiOperation({
    summary: 'Get one language',
  })
  @Get(':id')
  async getOneLanguageById(@Param('id') id: number) {
    return await this.languageService.findLanguageById(id);
  }

  @ApiOperation({
    summary: 'Update one language',
  })
  @Put(':id')
  async updateOneLanguageById(
    @Param('id') id: number,
    @Body() payload: UpdateLanguageDTO,
  ) {
    return await this.languageService.updateLanguageById(id, payload);
  }

  @ApiOperation({
    summary: 'Delete one language',
  })
  @Delete(':id')
  async deleteOneLanguageById(@Param('id') id: number) {
    return await this.languageService.deleteLanguageById(id);
  }
}
