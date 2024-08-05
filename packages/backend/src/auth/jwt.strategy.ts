import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './auth.constants';
import { Request } from 'express';
import { JwtUserPayload } from '../_decorators/user';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWTCookie]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtUserPayload) {
    const user = await this.authService.getUserById(payload.uuid);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private static extractJWTCookie(req: Request): string | null {
    const userToken = req?.cookies['user_token'] ?? '';
    if (userToken.length > 0) {
      return userToken;
    }
    return null;
  }
}
