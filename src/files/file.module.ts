import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './controllers/file.controller';
import { FileService } from './services/file.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dest: configService.get('mutler.dest'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
