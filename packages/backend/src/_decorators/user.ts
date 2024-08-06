import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserEntity } from '../_entities/user.entity';

export type JwtUserPayload = { email: string; uuid: string };

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserEntity;
  },
);
