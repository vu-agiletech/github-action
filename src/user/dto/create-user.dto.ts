import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
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

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
