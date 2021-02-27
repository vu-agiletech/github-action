import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import jsonConfig from './config/json.config';
import { JsonModule } from './module/json/json.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jsonConfig],
    }),
    JsonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
