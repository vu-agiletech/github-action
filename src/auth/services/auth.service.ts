import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(
    textPlain: string,
    cyperText: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(textPlain, cyperText);
  }

  async generateJwt(user: UserEntity): Promise<string> {
    return this.jwtService.signAsync({
      id: user.id,
      username: user.username,
      role: user.role,
    });
  }
}
