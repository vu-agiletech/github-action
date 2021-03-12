import { Controller, Post } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiHeader({
  name: 'xattack',
  required: true,
})
@ApiTags('Authenication')
@Controller('auth')
export class AuthController {
  @Post('register')
  async register() {}

  @Post('login')
  async login() {}

  @Post('refresh-token')
  async refreshToken() {}
}
