import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth..guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user); // return JWT access token
  }

  /**
   * require a bearer token, validate token
   * @param req
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  findAll(@Request() req) {
    return req.user;
  }
}
