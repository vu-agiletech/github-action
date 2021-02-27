import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpJson } from 'src/common/http/http-json';
import { JsonController } from './json.controller';
import { JsonService } from './json.service';

@Module({
  imports: [HttpJson, ConfigModule],
  controllers: [JsonController],
  providers: [JsonService, ConfigService],
})
export class JsonModule {}
