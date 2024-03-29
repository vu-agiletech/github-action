import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

type ErrorReponse = {
  message: string[] | string;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  logRequest(req: Request) {
    const now = Date.now();
    const { method, url, hostname } = req;
    Logger.error(`${hostname}-${method}-${url}-${Date.now() - now}ms`);
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const request: Request = ctx.getRequest<Request>();
    const response: Response = ctx.getResponse<Response>();
    const status: number =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorRespones: ErrorReponse = exception.getResponse() as ErrorReponse;
    this.logRequest(request);
    response.status(status).json({
      statusCode: status,
      timeStamp: new Date().toISOString(),
      path: request.path,
      error: errorRespones.message.toString(),
    });
  }
}
