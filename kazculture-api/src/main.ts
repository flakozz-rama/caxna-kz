import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get('apiPrefix'));

  app.enableCors({
    origin: configService.get('cors.origin'),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Kazakh Cultural Portal API')
    .setDescription('API for Kazakh Cultural Portal and Admin Dashboard')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Authentication', 'Admin authentication endpoints')
    .addTag('Articles', 'Article management endpoints')
    .addTag('Videos', 'Video management endpoints')
    .addTag('Interviews', 'Interview management endpoints')
    .addTag('Zhanalyqtar', 'News management endpoints')
    .addTag('ArnaiyZhobalar', 'Special events management endpoints')
    .addTag('Users', 'User management endpoints')
    .addTag('Uploads', 'File upload endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get('port') || 3001;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
