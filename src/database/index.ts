import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export default TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mariadb',
    host: configService.get('database.host'),
    port: +configService.get<number>('database.port'),
    username: configService.get('database.username'),
    password: configService.get('database.password'),
    database: configService.get('database.database'),
    entities: [__dirname + '/entities/**/*.js'],
    autoLoadEntities: true,
    synchronize: true,
  }),
  inject: [ConfigService],
});
