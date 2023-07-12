import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByEmail(username);

    if (!user) {
      throw new Error('User not found');
    }
    const match = await user.validatePassword(password);
    if (match) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { name: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
