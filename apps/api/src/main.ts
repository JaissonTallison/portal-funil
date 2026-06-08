import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Trust reverse proxy (nginx) so req.ip reflects real client IP in audit logs
  app.set('trust proxy', 1);

  // Security headers (X-Frame-Options, X-Content-Type-Options, HSTS, etc.)
  app.use(helmet());

  // Gzip compression for JSON responses
  app.use(compression());

  app.setGlobalPrefix('api/v1');

  app.use(cookieParser());

  app.useStaticAssets(join(__dirname, '..', '..', 'public'), {
    prefix: '/',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.WEB_URL ?? 'http://localhost:3010',
    credentials: true,
  });

  const port = process.env.PORT ?? 3002;
  await app.listen(port, '0.0.0.0');
  console.log(`API running on http://localhost:${port}/api/v1`);
}

bootstrap();
