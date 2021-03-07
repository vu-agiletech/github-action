import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiProperty({
    type: String,
    required: true,
  })
  username: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  password: string;
}
