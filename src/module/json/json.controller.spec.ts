import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JsonController } from './json.controller';
import { JsonService } from './json.service';

describe('JsonController', () => {
  let controller: JsonController;
  let service: JsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JsonController],
      providers: [JsonService],
      imports: [HttpModule],
    }).compile();

    controller = module.get<JsonController>(JsonController);
    service = module.get<JsonService>(JsonService);
  });

  describe('(GET) /jsons/', () => {
    it('should be array todos', async () => {
      const result = [
        {
          userId: 1,
          id: 30,
          title: 'string',
          completed: true,
        },
      ];
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(result));
      expect(await controller.findAllJson()).toBe(result);
    });
  });

  describe('(GET) /jsons/:id', () => {
    it('should be a todos', async () => {
      const id: number = 1;
      const result = {
        userId: id,
        id: id,
        title: 'string',
        completed: true,
      };
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(result));
      expect(await controller.findOneJson(id)).toBe(result);
    });
  });
});
