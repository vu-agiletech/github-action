import { registerAs } from '@nestjs/config';

export default registerAs('aoe', () => ({
  url: process.env.AOE_URL,
  timeout: 20000,
}));
