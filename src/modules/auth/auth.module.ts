import { Module } from '@nestjs/common';

import { AuthController } from './controllers/v1/auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AUTH } from 'src/infrastructure/configs/auth.config';
import { JwtStrategy } from './strategies/auth-jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      /* Set global to true, this means that we don't need to import the JwtModule anywhere else in our application */
      global: true,
      secret: AUTH.JWT.SECRET,
      signOptions: { expiresIn: AUTH.JWT.EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
