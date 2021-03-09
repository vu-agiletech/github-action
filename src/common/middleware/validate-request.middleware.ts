import { HttpStatus, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class ValidateRequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.xattack === '1') {
      next();
    } else {
      res.json({
        status: HttpStatus.BAD_REQUEST,
        timeStamp: new Date().toISOString(),
        error: 'Request invaild',
      });
    }
  }
}
