import { Module } from '@nestjs/common';
import { UserRecordsService } from './user-records.service';
import { UserRecordsController } from './user-records.controller';
import { ModelsModule } from '../models.module';
import { LambdaModule } from '../lambda/lambda.module';

@Module({
  imports: [ModelsModule, LambdaModule],
  controllers: [UserRecordsController],
  providers: [UserRecordsService],
  exports: [UserRecordsService],
})
export class UserRecordsModule {}
