import { Controller, Get } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiHeader({
  name: 'xattack',
  required: true,
})
@ApiTags('User')
@Controller('users')
export class UserController {
  @Get(':id/profile')
  async getProfile() {}
}
