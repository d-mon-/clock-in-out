import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../_decorators/public';
import { JsonWebTokenError } from '@nestjs/jwt';
import { common } from 'common';
import { Response } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  override canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  override handleRequest(
    _err: any,
    user: any,
    info: any,
    context: ExecutionContext,
  ) {
    if (info instanceof JsonWebTokenError) {
      const response: Response = context.getArgByIndex(1);
      response.clearCookie(common.cookies.access_token);
      response.clearCookie(common.cookies.is_authenticated);
      throw new UnauthorizedException();
    }
    return user;
  }
}
