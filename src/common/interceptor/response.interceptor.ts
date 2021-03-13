import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req: Request = context.switchToHttp().getRequest();
    const now = Date.now();
    const { method, url, hostname } = req;
    return next.handle().pipe(
      tap(() => {
        const time = Date.now() - now;
        Logger.verbose(`${hostname}-${method}-${url}-${time}ms`);
      }),
    );
  }
}
