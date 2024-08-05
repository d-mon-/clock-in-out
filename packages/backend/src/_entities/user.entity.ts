import { Exclude, instanceToPlain } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { UserRecord } from './user-record.entity';
import { BaseEntity } from './templates/base';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'uuid of the clock event',
  })
  uuid: string;

  @Column()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User firstname',
  })
  firstName: string;

  @Column()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User lastname',
  })
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  @ApiProperty({
    description: 'User email',
  })
  email: string;

  @Column()
  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  @ApiProperty({
    description: 'user password',
  })
  password: string; //+ salt; Later, if we add saml strategies, we would move this to a different table

  @OneToMany(() => UserRecord, (clock) => clock.user)
  clockRecords: UserRecord[];

  toJSON() {
    return instanceToPlain(this); // prevent password leak when serializing
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
