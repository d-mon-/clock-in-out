import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  Check,
  Column,
  Entity,
  Exclusion,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { IsDate, IsOptional } from 'class-validator';
import { BaseEntity } from './templates/base';
import { Exclude, instanceToPlain } from 'class-transformer';

@Entity()
@Check('"clockIn" IS NOT NULL OR "clockOut" IS NOT NULL')
@Exclusion(`USING gist ("userUuid" WITH =, "tsRange" WITH &&)`) // Do not allow time overlap
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

  @Column({
    nullable: true,
    type: 'tsrange',
    generatedType: 'STORED',
    asExpression:
      'CASE WHEN ("clockIn" IS NOT NULL and "clockOut" IS NOT NULL) THEN tsrange("clockIn", "clockOut") ELSE NULL END',
  })
  @Index({ spatial: true }) // use Gist index (search)
  @Exclude({ toPlainOnly: true })
  @ApiHideProperty() // tsRange is only inhouse
  tsRange?: string | null;

  @ManyToOne(() => User, (user) => user.clockRecords)
  user: User;

  toJSON() {
    return instanceToPlain(this); // prevent password leak when serializing
  }
}
