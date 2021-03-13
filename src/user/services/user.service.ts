import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/services/auth.service';
import { generateUuid } from 'src/common/utils';
import { ResponseOk } from 'src/response';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/create-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly authService: AuthService,
  ) {}

  async create(payload: CreateUserDTO): Promise<UserEntity> {
    const hashPassword: string = await this.authService.hashPassword(
      payload.password,
    );
    const refreshToken: string = generateUuid();
    try {
      const user = this.userRepository.create({
        username: payload.username,
        password: hashPassword,
        refreshToken,
      });
      await this.userRepository.save(user);
      const { password, ...result } = user;
      return result;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOneUser(username: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({ username });
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    throw new NotFoundException();
  }

  async findOneUserById(id: number): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    const matchPassword: boolean = await this.authService.comparePassword(
      password,
      user.password,
    );
    if (matchPassword) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async login(payload: LoginUserDTO): Promise<ResponseOk> {
    const user: UserEntity = await this.validateUser(
      payload.username,
      payload.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const jwtString = await this.authService.generateJwt(user);
    return {
      accessToken: jwtString,
      refreshToken: user.refreshToken,
    };
  }

  async refreshToken(refresh: string): Promise<ResponseOk> {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        refreshToken: refresh,
      },
    });
    if (!user) {
      throw new BadRequestException();
    }
    const jwtString = await this.authService.generateJwt(user);
    return {
      accessToken: jwtString,
      refreshToken: user.refreshToken,
    };
  }
}
