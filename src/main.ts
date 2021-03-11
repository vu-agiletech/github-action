import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  app.setGlobalPrefix('/api/v1');
  const config = new DocumentBuilder()
    .setTitle('Document API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('Swagger')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.log(`========== Server running on ${PORT} ========== `);
  });
}
bootstrap();
