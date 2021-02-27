import { registerAs } from '@nestjs/config';

export default registerAs('json', () => ({
  url: process.env.JSON_URL,
  timeout: 20000,
}));
