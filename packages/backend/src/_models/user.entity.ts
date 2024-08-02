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
  password: string; // Later, if we add saml strategies, we would move this to a different table

  @Column()
  @IsNotEmpty()
  @Exclude()
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
