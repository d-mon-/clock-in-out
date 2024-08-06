import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../../_config/config.service';
import { UserRecordsModule } from '../../user-records/user-records.module';
import { UsersModule } from '../../users/users.module';
import { EventsModule } from './events/events.module';

const externalModules = [UsersModule, UserRecordsModule];

@Module({
  imports: [
    ...externalModules,
    EventsModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
})
export class AppModule {}
