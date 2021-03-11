import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  store: process.env.CACHE_STORE,
  host: process.env.CACHE_HOST,
  port: process.env.CACHE_PORT,
  ttl: 2000,
}));
