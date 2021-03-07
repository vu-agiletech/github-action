import { Post, Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/services/auth.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
}
