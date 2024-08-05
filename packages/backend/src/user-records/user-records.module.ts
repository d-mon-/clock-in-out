import { Module } from '@nestjs/common';
import { UserRecordsService } from './user-records.service';
import { UserRecordsController } from './user-records.controller';
import { ModelsModule } from '../models/models.module';

@Module({
  imports: [ModelsModule],
  controllers: [UserRecordsController],
  providers: [UserRecordsService],
})
export class UserRecordsModule {}
