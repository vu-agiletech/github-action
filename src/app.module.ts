import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LanguageModule } from './language/language.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import databaseConfig from './config/database.config';
import jsonConfig from './config/json.config';
import DatabaseModule from './database/';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jsonConfig, databaseConfig],
    }),
    DatabaseModule,
    ProjectModule,
    LanguageModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
