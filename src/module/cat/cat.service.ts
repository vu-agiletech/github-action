import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatDto } from './dto/cat.dto';
import { CatEntity } from './entities/cat.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatEntity)
    private readonly catRepo: Repository<CatEntity>,
  ) {}

  async getAll(): Promise<CatEntity[]> {
    return this.catRepo.find();
  }

  async getOne(id: number): Promise<CatEntity> {
    return this.catRepo.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async updateOne(id: number, payload: CatDto): Promise<CatEntity> {
    await this.catRepo.update({ id }, payload);
    return this.getOne(id);
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
