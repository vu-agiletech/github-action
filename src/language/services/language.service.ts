import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseOk, Error } from '../../response/';
import { Repository } from 'typeorm';
import { UpdateLanguageDTO } from '../dto/language-update.dto';
import { LanguageEntity } from '../entities/language.entity';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(LanguageEntity)
    private readonly languageRepo: Repository<LanguageEntity>,
  ) {}

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
    const languageFindById = await this.languageRepo.findOne({
      where: {
        id,
      },
    });
    if (!languageFindById) {
      throw new NotFoundException();
    }
    try {
      const languageAfterUpdate = await this.languageRepo.save({
        ...languageFindById,
        ...payload,
      });
      return languageAfterUpdate;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async deleteLanguageById(id: number): Promise<boolean> {
    const recordFindById = await this.languageRepo.findOne(id);
    if (!recordFindById) {
      throw new NotFoundException();
    }
    try {
      await this.languageRepo.delete({ id });
    } catch (e) {
      throw new InternalServerErrorException();
    }
    return true;
  }
}
