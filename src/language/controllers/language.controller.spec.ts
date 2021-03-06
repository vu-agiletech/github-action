import { Test, TestingModule } from '@nestjs/testing';
import { LanguageService } from '../services/language.service';
import { LanguageController } from './language.controller';
import { LanguageEntity } from '../entities/language.entity';
import { ResponseOk } from '../../response';

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

describe('', async () => {
  let service: LanguageService;
  let controller: LanguageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: LanguageService,
          useValue: {
            findLanguageById: jest.fn().mockResolvedValue(responseOk),
            updateLanguageById: jest.fn().mockResolvedValue(responseOk),
            deleteLanguageById: jest.fn().mockRejectedValue(responseOk),
          },
        },
      ],
    }).compile();

    service = module.get<LanguageService>(LanguageService);
    controller = module.get<LanguageController>(LanguageController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('getOneLanguageById', () => {
    it('it should be return object', async () => {
      await expect(controller.getOneLanguageById(1)).toEqual(responseOk);
    });
  });

  describe('updateOneLanguageById', () => {
    it('it should be return object', async () => {
      await expect(
        controller.updateOneLanguageById(1, {
          author: 'author',
          language: 'Javascript',
          publishYear: 1995,
        }),
      ).toEqual(responseOk);
    });
  });

  describe('deleteOneLanguageById', () => {
    it('it should be return true', async () => {
      await expect(controller.deleteOneLanguageById(1)).toEqual(responseOk);
    });
  });
});
