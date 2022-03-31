import { Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuth } from './local/local-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @LocalAuth()
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
