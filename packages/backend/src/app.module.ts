import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './_config/config.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserRecordsController } from './user-records/user-records.controller';
import { UserRecordsService } from './user-records/user-records.service';
import { UserRecordsModule } from './user-records/user-records.module';
import { ModelsModule } from './models/models.module';

@Module({
  imports: [
    AuthModule,
    ModelsModule,
    UsersModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    UserRecordsModule,
  ],
  controllers: [UserRecordsController],
  providers: [UserRecordsService],
})
export class AppModule {}
