import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './_entities/user.entity';
import { UserRecord } from './_entities/user-record.entity';

/**
 * This is my personal preference, I prefer to have a single folder with all entities inside
 * to make it more convenient for me in comparaison to having entities at each resource level.
 * That's also make it easier when creating future services, each service will have its own "ModelsModule"
 */
@Module({
  imports: [TypeOrmModule.forFeature([User, UserRecord])],
  exports: [TypeOrmModule],
})
export class ModelsModule {}
