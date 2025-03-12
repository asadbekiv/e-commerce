import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const docs_password = process.env.docs_password;

  app.use(
    '/api/docs*',
    basicAuth({
      challenge: true,
      users: {
        admin: docs_password,
      },
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
