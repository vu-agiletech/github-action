import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './stragety/jwt.stragety';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secretKey'),
        signOptions: { expiresIn: '300s' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, RoleGuard, JwtAuthGuard, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
