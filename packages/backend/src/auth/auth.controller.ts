import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Public } from '../_decorators/public';
import { User } from '../_models/user.entity';
import { AuthService } from './auth.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { AuthLoginDto } from './dto/auth-login';
import { ApiBody } from '@nestjs/swagger';
import { LocalUser } from '../_decorators/user';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * User login endpoint
   */
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 100, ttl: 60000 } })
  @Public()
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: AuthLoginDto })
  @Post('login')
  async login(
    @LocalUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const access_token = await this.authService.login(user);

    res.cookie('user_token', access_token, { secure: true, httpOnly: true });
    res.cookie('is_authenticated', 1, { signed: true });

    return { email: user.email };
  }
}
