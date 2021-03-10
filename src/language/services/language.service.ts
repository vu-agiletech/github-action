import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pagination } from 'src/common/utils';
import { Repository } from 'typeorm';
import { LanguageCreateDTO } from '../dto/language-create.dto';
import { UpdateLanguageDTO } from '../dto/language-update.dto';
import { LanguageEntity } from '../entities/language.entity';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(LanguageEntity)
    private readonly languageRepo: Repository<LanguageEntity>,
  ) {}

  async findAllLanguages(
    page: number,
    size: number,
  ): Promise<LanguageEntity[]> {
    try {
      const [offset, limit] = pagination(page, size);
      const languages: LanguageEntity[] = await this.languageRepo.find({
        where: {},
        skip: offset,
        take: limit,
      });

      return languages;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async createOneLanguage(payload: LanguageCreateDTO): Promise<LanguageEntity> {
    try {
      const language: LanguageEntity = this.languageRepo.create(payload);
      return await this.languageRepo.save(language);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async findLanguageById(id: number): Promise<LanguageEntity> {
    const language: LanguageEntity = await this.languageRepo.findOne({
      where: {
        id,
      },
    });
    if (!language) {
      throw new NotFoundException();
    }
    return language;
  }

  async updateLanguageById(
    id: number,
    payload: UpdateLanguageDTO,
  ): Promise<LanguageEntity> {
    const languageFindById: LanguageEntity = await this.languageRepo.findOne({
      where: {
        id,
      },
    });
    if (!languageFindById) {
      throw new NotFoundException();
    }
    try {
      const languageAfterUpdate: LanguageEntity = await this.languageRepo.save({
        ...languageFindById,
        ...payload,
      });
      return languageAfterUpdate;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async deleteLanguageById(id: number): Promise<boolean> {
    const recordFindById: LanguageEntity = await this.languageRepo.findOne(id);
    if (!recordFindById) {
      throw new NotFoundException();
    }
    try {
      await this.languageRepo.delete({ id });
    } catch (e) {
      throw new InternalServerErrorException(e.messsage);
    }
    return true;
  }
}
