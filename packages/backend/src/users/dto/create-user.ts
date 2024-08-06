import { PickType } from '@nestjs/swagger';
import { User } from '../../_entities/user.entity';

export class CreateUserDto extends PickType(User, [
  'email',
  'firstName',
  'lastName',
  'password',
] as const) {}
