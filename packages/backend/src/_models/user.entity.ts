import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPositive } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsPositive()
  id: number;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @Exclude()
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
