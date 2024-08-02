import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Public } from '../_decorators/public';
import { User } from '../_models/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Req() req: Request & { user: User },
    @Res({ passthrough: true }) res: Response,
  ) {
    const access_token = await this.authService.login(req.user);
    res.cookie('user_token', access_token, { signed: true, httpOnly: true });
    return {};
  }
}
