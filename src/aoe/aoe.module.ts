import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('aoe.timeout'),
        baseURL: configService.get('aoe.url'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AoeModule {}
