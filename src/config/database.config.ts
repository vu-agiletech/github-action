import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DB_URL,
}));
