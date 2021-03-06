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

  async findLanguageById(id: number): Promise<ResponseOk> {
    const record: LanguageEntity = await this.languageRepo.findOne({
      where: {
        id,
      },
    });

    if (!record) {
      throw new NotFoundException({
        status: false,
        data: Error.DATA_NOT_FOUND_WITH_ID,
      });
    }

    return {
      status: true,
      data: record,
    };
  }

  async updateLanguageById(
    id: number,
    payload: UpdateLanguageDTO,
  ): Promise<ResponseOk> {
    const recordFindById = await this.languageRepo.findOne({
      where: {
        id,
      },
    });
    if (!recordFindById) {
      throw new NotFoundException({
        status: false,
        data: Error.DATA_NOT_FOUND_WITH_ID,
      });
    }
    try {
      const recordAfterUpdate = await this.languageRepo.save({
        ...recordFindById,
        ...payload,
      });
      return {
        status: true,
        data: recordAfterUpdate,
      };
    } catch (e) {
      throw new InternalServerErrorException({
        status: false,
        data: Error.SERVER_INTERNAL,
      });
    }
  }

  async deleteLanguageById(id: number): Promise<ResponseOk> {
    const recordFindById = await this.languageRepo.findOne(id);
    if (!recordFindById) {
      throw new NotFoundException({
        status: false,
        data: Error.DATA_NOT_FOUND_WITH_ID,
      });
    }
    try {
      await this.languageRepo.delete({ id });
    } catch (e) {
      throw new InternalServerErrorException({
        status: false,
        data: Error.SERVER_INTERNAL,
      });
    }
    return {
      status: true,
    };
  }
}
