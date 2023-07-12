import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { JwtStrategy } from './jwt.strategy';

config();

const configService = new ConfigService();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: configService.getOrThrow('SESSION_SECRET'),
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
