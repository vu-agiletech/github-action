import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

export default ThrottlerModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    ttl: configService.get('limit.ttl'),
    limit: configService.get('limit.limit'),
  }),
  inject: [ConfigService],
});
