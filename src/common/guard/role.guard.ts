import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/services/user.service';
import { Request } from 'express';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,

    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    if (!roles) {
      return true;
    }
    const req: Request = context.switchToHttp().getRequest();
    const userRequest: any = req.user;
    const user: UserEntity = await this.userService.findOneUserById(
      userRequest.id,
    );
    return user && this.checkRole(roles, user.role);
  }

  checkRole(roles: string[], role: string): boolean {
    return roles.includes(role) ? true : false;
  }
}
