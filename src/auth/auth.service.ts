import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
}
