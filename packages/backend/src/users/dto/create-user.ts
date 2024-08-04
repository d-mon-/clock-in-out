import { PickType } from '@nestjs/swagger';
import { User } from '../../_models/user.entity';

export class CreateUserDto extends PickType(User, [
  'email',
  'firstName',
  'lastName',
  'password',
] as const) {}
