import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class AoeService {
  constructor(private readonly httpService: HttpService) {}

  async getCivilizations() {}

  async getCivilizationById(id: number) {}
}
