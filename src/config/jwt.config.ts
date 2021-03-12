import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secretKey: process.env.JWT_SECRET,
}));
