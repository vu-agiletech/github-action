import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import jsonConfig from './config/json.config';
import { CatModule } from './module/cat/cat.module';
import { JsonModule } from './module/json/json.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jsonConfig, databaseConfig],
    }),
    JsonModule,
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
