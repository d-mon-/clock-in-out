import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { UsersModule } from '../../../users/users.module';
import { UserRecordsModule } from '../../../user-records/user-records.module';

@Module({
  imports: [UsersModule, UserRecordsModule],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
