import { PickType } from '@nestjs/mapped-types';
import { User } from '../../_models/user.entity';

export class CreateUserDto extends PickType(User, [
  'email',
  'firstName',
  'lastName',
  'password',
] as const) {}
