import { registerAs } from '@nestjs/config';

export default registerAs('mutler', () => ({
  dest: './upload',
}));
