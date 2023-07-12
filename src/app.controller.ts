import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthenticatedGuard } from './auth/authenticated.guard';

@Controller()
export class AppController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return { msg: 'logged in' };
  }
  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  findAll(@Request() req) {
    return req.user;
  }
}
