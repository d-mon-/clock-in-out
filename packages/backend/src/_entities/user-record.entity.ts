import { ApiProperty } from '@nestjs/swagger';
import {
  Check,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { IsDate, IsOptional } from 'class-validator';
import { BaseEntity } from './templates/base';

@Entity()
@Check('"clockIn" IS NOT NULL OR "clockOut" IS NOT NULL')
@Index(['user', 'createdAt'])
export class UserRecord extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'uuid of the clock event',
  })
  uuid: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsDate()
  @ApiProperty({ description: 'User clockin input' })
  clockIn?: Date;

  @Column({ nullable: true })
  @IsOptional()
  @IsDate()
  @ApiProperty({ description: 'User clockout input' })
  clockOut?: Date;

  @ManyToOne(() => User, (user) => user.clockRecords)
  user: User;
}
