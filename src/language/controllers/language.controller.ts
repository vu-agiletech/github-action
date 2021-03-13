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
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';
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
    summary: 'Get languages',
  })
  @Get()
  async getLanguages(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ): Promise<ResponseOk[]> {
    const result: LanguageEntity[] = await this.languageService.findAllLanguages(
      page,
      size,
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

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update one language by id',
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
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

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete one language',
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
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
