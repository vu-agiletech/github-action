import { registerAs } from '@nestjs/config';

export default registerAs('limit', () => ({
  ttl: 30,
  limit: 60,
}));
