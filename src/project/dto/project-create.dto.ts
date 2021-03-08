import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class ProjectCreateDTO {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({})
  @IsString()
  public language: string;

  @ApiProperty({})
  @IsDate()
  @IsNotEmpty()
  public createAt: Date;

  @ApiProperty({})
  @IsDate()
  @IsNotEmpty()
  public updateAt: Date;
}
