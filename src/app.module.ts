import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import CacheModule from './cache';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { ValidateRequestMiddleware } from './common/middleware/validate-request.middleware';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import cacheConfig from './config/cache.config';
import limitRequestConfig from './config/limit-request.config';
import ThrottlerModule from './throttle';
import jwtConfig from './config/jwt.config';
import { FileModule } from './files/file.module';

@Module({
  imports: [
    // config
    ConfigModule.forRoot({
      load: [
        jsonConfig,
        databaseConfig,
        cacheConfig,
        limitRequestConfig,
        jwtConfig,
      ],
    }),

    // module config
    DatabaseModule,
    CacheModule,
    ThrottlerModule,

    // feature module
    UserModule,
    AuthModule,
    LanguageModule,
    ProjectModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateRequestMiddleware)
      .forRoutes('languages', 'projects', 'users', 'auth');
  }
}
