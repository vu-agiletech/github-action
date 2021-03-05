import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatService } from './cat.service';
import { CatEntity } from './entities/cat.entity';

const cats = [
  new CatEntity('Test Cat 2', 'Test Breed 2', 3),
  new CatEntity('Test Cat 3', 'Test Breed 3', 2),
  new CatEntity('Test Cat ', 'Test Breed 1', 4),
];

const cat = new CatEntity('Cat test', 'Breed', 4);

describe('CatService', () => {
  let catService: CatService;
  let catRepo: Repository<CatEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatService,
        {
          provide: getRepositoryToken(CatEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(cats),
            findOneOrFail: jest.fn().mockResolvedValue(cat),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    catService = module.get<CatService>(CatService);
    catRepo = module.get<Repository<CatEntity>>(getRepositoryToken(CatEntity));
  });

  describe('getAll', () => {
    it('should return array', async () => {
      const testCats = await catService.findAll();
      expect(testCats).toEqual(cats);
    });
  });

  describe('getOne', () => {
    it('should return cat object', async () => {
      const testCat = await catService.findOne(1);
      expect(testCat).toEqual(cat);
    });
  });

  describe('updateOne', () => {
    it('should return cat object', async () => {
      const testCat = await catService.updateOne(1, {
        name: 'Cat',
        breed: 'Dog',
        age: 3,
      });
      expect(testCat).toEqual(cat);
    });
  });

  describe('deleteOne', () => {
    it('should return {deleted: true}', () => {
      expect(catService.deleteOne(1)).resolves.toEqual({ status: true });
    });
    it('should return {deleted: false, message: err.message}', () => {
      jest
        .spyOn(catRepo, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(catService.deleteOne(2)).resolves.toEqual({
        status: false,
        data: 'Bad Delete Method.',
      });
    });
  });
});
