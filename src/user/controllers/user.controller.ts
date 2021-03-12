import { Body, Controller, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseOk } from 'src/response';
import { CreateUserDTO } from '../dto/create-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@ApiHeader({
  name: 'xattack',
  required: true,
})
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'register new user',
  })
  @Post('register')
  async register(@Body() payload: CreateUserDTO): Promise<ResponseOk> {
    const user: UserEntity = await this.userService.create(payload);
    return user;
  }

  @ApiOperation({
    summary: 'login user',
  })
  @Post('login')
  async login(@Body() payload: LoginUserDTO): Promise<ResponseOk> {
    const jwt: ResponseOk = await this.userService.login(payload);
    return jwt;
  }

  @ApiOperation({
    summary: 'refresh token user',
  })
  @Post('refresh-token')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
  ): Promise<ResponseOk> {
    const jwt: ResponseOk = await this.userService.refreshToken(refreshToken);
    return jwt;
  }
}
