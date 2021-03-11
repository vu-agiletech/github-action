import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateLanguageDTO {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  language: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  publishYear: number;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  author: string;
}
