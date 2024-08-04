import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserEntity } from '../_models/user.entity';

export const LocalUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserEntity;
  },
);

export const JwtUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as { email: string; usewrId: string };
  },
);
