import { ApiProperty } from '@nestjs/swagger';

export class UpdateLanguageDTO {
  @ApiProperty({
    type: String,
    required: true,
  })
  language: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  publishYear: number;

  @ApiProperty({
    type: String,
    required: true,
  })
  author: string;
}
