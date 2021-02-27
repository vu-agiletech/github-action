import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class JsonService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    try {
      const result = await this.httpService
        .get('/todos')
        .pipe(map((response) => response.data))
        .toPromise();
      return result;
    } catch (e) {
      throw new BadRequestException({
        status: false,
        data: e,
      });
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.httpService
        .get(`/todos/${id}`)
        .pipe(map((response) => response.data))
        .toPromise();
      return result;
    } catch (e) {
      throw new BadRequestException({
        status: false,
        data: e,
      });
    }
  }
}
