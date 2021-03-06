import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResponseOk } from '../../response';
import { Repository } from 'typeorm';
import { UpdateLanguageDTO } from '../dto/language-update.dto';
import { LanguageEntity } from '../entities/language.entity';
import { LanguageService } from './language.service';

const language: LanguageEntity = new LanguageEntity(
  1,
  'Typescript',
  2012,
  'Microsoft',
);
const responseOk: ResponseOk = {
  status: true,
  data: language,
};

describe('LanguageService', async () => {
  let service: LanguageService;
  let repo: Repository<LanguageEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LanguageService,
        {
          provide: getRepositoryToken(LanguageEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(language),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    service = module.get<LanguageService>(LanguageService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneLanguage', () => {
    it('should return one language', async () => {
      jest.spyOn(repo, 'findOne');
      const result = await service.findLanguageById(1);
      expect(result).toEqual(responseOk);
    });
  });

  describe('updateOneLanguage', () => {
    it('should return one language updated', async () => {
      const payload: UpdateLanguageDTO = {
        author: 'James Gosling',
        publishYear: 1995,
        language: 'Java',
      };
      jest.spyOn(repo, 'update');
      const result = await service.updateLanguageById(1, payload);
      expect(result).toEqual(responseOk);
    });
  });

  describe('delete', () => {
    it('should return delete object', async () => {
      jest.spyOn(repo, 'delete');
      const result = await service.deleteLanguageById(1);
      expect(result).toEqual(responseOk);
    });
  });
});
