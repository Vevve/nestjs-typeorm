import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);

    const payload = {
      userId: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;

    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new Error('User is not found');
    }

    const match = await user?.validatePassword(password);
    if (match === false) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
