import { ApiProperty } from '@nestjs/swagger';

export class LanguageCreateDTO {
  @ApiProperty({
    required: true,
    type: String,
  })
  language: string;

  @ApiProperty({
    required: true,
    type: Number,
  })
  publishYear: number;

  @ApiProperty({
    required: true,
    type: String,
  })
  author: string;
}
