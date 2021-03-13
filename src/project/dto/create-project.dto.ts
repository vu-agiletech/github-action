import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProjectDTO {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  public languageId: number;
}
