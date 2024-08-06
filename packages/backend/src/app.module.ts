import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './_config/config.service';
import { AuthModule } from './auth/auth.module';
import { ModelsModule } from './models.module';
import { UserRecordsModule } from './user-records/user-records.module';
import { UsersModule } from './users/users.module';
import { LambdaModule } from './lambda/lambda.module';

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
    LambdaModule,
  ],
})
export class AppModule {}
