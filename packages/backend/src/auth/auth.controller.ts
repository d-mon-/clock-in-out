import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Public } from '../_decorators/public';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthLoginDto } from './dto/auth-login';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: AuthLoginDto) {
    return this.authService.login(loginDto);
  }
}
