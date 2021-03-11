import { CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

export default CacheModule.registerAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    store: configService.get('cache.store'),
    host: configService.get('cache.host'),
    port: configService.get('cache.port'),
    ttl: +configService.get('cache.ttl'),
  }),
  inject: [ConfigService],
});
