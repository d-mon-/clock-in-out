import { Module } from '@nestjs/common';
import { ModelsModule } from '../models.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ModelsModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
