import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
  })
  @MinLength(7)
  @IsAlphanumeric()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
  })
  @MinLength(7)
  password: string;
}
