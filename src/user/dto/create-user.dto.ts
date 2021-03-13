import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsAlphanumeric,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @IsAlphanumeric()
  username: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @MinLength(7)
  @IsString()
  password: string;
}
