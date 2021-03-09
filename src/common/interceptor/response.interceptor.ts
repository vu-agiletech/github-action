import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req: Request = context.switchToHttp().getRequest();
    const now = Date.now();
    const { method, url, hostname } = req;
    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.verbose(`${hostname}-${method}-${url}-${Date.now() - now}ms`),
        ),
      );
  }
}
