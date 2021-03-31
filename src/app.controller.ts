import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import * as os from 'os';

@ApiTags('app')
@UseGuards(ThrottlerGuard)
@Throttle(60, 30)
@Controller()
export class AppController {
  @Get('/*')
  @Render('index')
  root() {
    return {
      message: `${os.hostname()}`,
    };
  }
}
