import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDTO } from '../dto/register.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, encrypt: string) {
    return await bcrypt.compare(password, encrypt);
  }

  public async register(payload: RegisterDTO): Promise<UserEntity> {
    const hashedPassword = await this.encryptPassword(payload.password);
    try {
      const newUser: UserEntity = await this.userService.createUser({
        username: payload.username,
        password: hashedPassword,
      });
      return newUser;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async login(payload: LoginDTO) {
    const user = await this.userService.findOneUser(payload.username);
    const hashPassword = await this.encryptPassword(payload.password);
    const isEqualPassword = await this.comparePassword(
      hashPassword,
      user.password,
    );
    if (isEqualPassword) {
      return {
        ...user,
        password: undefined,
      };
    }
    throw new HttpException(
      'Username or password is invalid',
      HttpStatus.BAD_REQUEST,
    );
  }
}
