import { Body, Controller, Post } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ResponseOk } from 'src/response';
import { UserEntity } from 'src/user/entities/user.entity';
import { RegisterDTO } from '../dto/register.dto';
import { AuthService } from '../services/auth.service';

@ApiHeader({
  name: 'xattack',
  required: true,
})
@ApiTags('Authenication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() payload: RegisterDTO): Promise<ResponseOk> {}

  @Post('login')
  async login() {}

  @Post('refresh-token')
  async refreshToken() {}
}
