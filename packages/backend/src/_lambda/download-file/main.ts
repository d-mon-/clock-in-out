import { NestFactory } from '@nestjs/core';
import { Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { EventsService } from './events/events.service';
import { HttpStatus } from '@nestjs/common';

export const handler: Handler = async (event: any) => {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const eventsService = appContext.get(EventsService);
  await eventsService.downloadAndEmailCSV(event);
  return { statusCode: HttpStatus.OK };
};
