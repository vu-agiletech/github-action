import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LanguageCreateDTO {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  language: string;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  publishYear: number;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  author: string;
}
