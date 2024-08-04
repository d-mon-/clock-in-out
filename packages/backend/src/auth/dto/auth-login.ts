import { PickType } from '@nestjs/swagger';
import { User } from '../../_models/user.entity';

export class AuthLoginDto extends PickType(User, [
  'email',
  'password',
] as const) {}
