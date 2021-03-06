import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageController } from './controllers/language.controller';
import { LanguageEntity } from './entities/language.entity';
import { LanguageService } from './services/language.service';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity])],
  providers: [LanguageService],
  controllers: [LanguageController],
})
export class LanguageModule {}
