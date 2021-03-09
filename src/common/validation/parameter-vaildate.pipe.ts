import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

type Value = string | number | Record<string, any> | any;

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: Value, metadata: ArgumentMetadata) {
    return value;
  }
}
