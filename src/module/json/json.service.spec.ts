import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JsonService } from './json.service';

describe('JsonService', () => {
  let service: JsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonService],
      imports: [HttpModule],
    }).compile();

    service = await module.resolve(JsonService);
  });

  describe('findAll', () => {
    it('should be return array todos', async () => {
      const result = [
        {
          userId: 1,
          id: 30,
          title: 'string',
          completed: true,
        },
      ];
      expect(service.findAll()).toEqual(Promise.resolve(result));
    });
  });

  describe('findOne', () => {
    it('should be return object todos', async () => {
      const result = {
        userId: 1,
        id: 30,
        title: 'string',
        completed: true,
      };
      expect(service.findOne(30)).toEqual(Promise.resolve(result));
    });
  });
});
