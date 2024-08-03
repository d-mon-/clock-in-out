import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPositive } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsPositive()
  @ApiProperty({
    description: 'UserId',
  })
  id: number;

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
  @Exclude()
  @ApiProperty({
    description: 'user password',
  })
  password: string; //+ salt; Later, if we add saml strategies, we would move this to a different table

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
