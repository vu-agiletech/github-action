import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatDTO } from './dto/cat.dto';
import { CatEntity } from './entities/cat.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatEntity)
    private readonly catRepo: Repository<CatEntity>,
  ) {}

  async findAll(): Promise<CatEntity[]> {
    return this.catRepo.find();
  }

  async findOne(id: number): Promise<CatEntity> {
    return this.catRepo.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async updateOne(id: number, payload: CatDTO): Promise<CatEntity> {
    await this.catRepo.update({ id }, payload);
    return this.findOne(id);
  }

  async deleteOne(id: number): Promise<{ status: boolean; data?: string }> {
    try {
      await this.catRepo.delete({ id });
      return { status: true };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        data: err.message,
      };
    }
  }
}
