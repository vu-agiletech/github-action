import { HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const HttpJson = HttpModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    baseURL: configService.get('json.url'),
    timeout: configService.get('json.timeout'),
    headers: {},
  }),
  inject: [ConfigService],
});
