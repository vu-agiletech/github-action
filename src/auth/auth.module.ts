import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStragety } from './stragety/local-stragety';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStragety],
  exports: [AuthService],
})
export class AuthModule {}
