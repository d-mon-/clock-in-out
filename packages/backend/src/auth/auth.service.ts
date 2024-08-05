import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../_entities/user.entity';
import { JwtUserPayload } from '../_decorators/user';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (await user?.validatePassword(pass)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtUserPayload = { email: user.email, uuid: user.uuid };
    return this.jwtService.sign(payload);
  }

  async getUserById(uuid: string) {
    const user = await this.usersService.findOne(uuid);
    if (!user) {
      return null;
    }
    user.password = ''; // Remove password for security reason
    return user;
  }
}
