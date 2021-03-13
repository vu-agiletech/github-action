import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface UserRequest {
  id: number;
  username: string;
  role: string;
}

export const CurrentUser = createParamDecorator(
  (data: UserRequest, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest();
    return req.user;
  },
);
