import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async findOneUser(username: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({ username });
    if (user) {
      return user;
    }
    throw new HttpException(
      'Username or password is invaild',
      HttpStatus.NOT_FOUND,
    );
  }

  async createUser(user: CreateUserDTO): Promise<UserEntity> {
    const newUser: UserEntity = await this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }
}
