import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  port: process.env.PORT,
}));
