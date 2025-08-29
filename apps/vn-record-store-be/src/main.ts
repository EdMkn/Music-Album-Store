/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-apollo-operation-name', 'apollo-require-preflight'],
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix, {
    exclude: ['/graphql'] // Exclude GraphQL from the global prefix
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

// For Vercel serverless deployment
let cachedApp: INestApplication | null = null;

async function createApp(): Promise<INestApplication> {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-apollo-operation-name', 'apollo-require-preflight'],
    });
    app.setGlobalPrefix('api', {
      exclude: ['/graphql'] // Exclude GraphQL from the global prefix
    });
    await app.init();
    cachedApp = app;
  }
  return cachedApp;
}

export async function handler(req: any, res: any) {
  const app = await createApp();
  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp(req, res);
}

// Only run bootstrap if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  bootstrap();
}
