import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { LanguageController } from './controllers/language.controller';
import { LanguageEntity } from './entities/language.entity';
import { LanguageService } from './services/language.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LanguageEntity]),
    forwardRef(() => UserModule),
  ],
  providers: [LanguageService],
  controllers: [LanguageController],
})
export class LanguageModule {}
