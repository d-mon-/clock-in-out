import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: put swagger behind a dev flag
  const config = new DocumentBuilder()
    .setTitle('Clock.us')
    .setDescription('Clock.us API description')
    .setVersion('1.0')
    .addTag('clockus')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser('secret')); // TODO update secret
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  });

  await app.listen(3001);
}

bootstrap();
