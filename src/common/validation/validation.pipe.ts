import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

type Value = string | number | object | any;

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: Value, metadata: ArgumentMetadata) {
    return value;
  }
}
