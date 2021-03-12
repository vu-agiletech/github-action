import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStragety extends PassportStrategy(Strategy) {
  constructor(private readonly authSerive: AuthService) {
    super();
  }
  async validate(username: string, password: string) {}
}
