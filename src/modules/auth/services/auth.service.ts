import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { AuthSignInDto } from '../dto/auth-sign-in.dto';
import type { JwtTokenPayload } from 'src/common/interface/jwt-payload.interface';
import { DB_FIELD } from 'src/common/constants/db-field.constant';
import { comparePassword } from 'src/common/utils/password.util';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private generateToken(payload: JwtTokenPayload): AuthDto {
    const { sub, email } = payload;
    const token = this.jwtService.sign({
      sub,
      email,
    });

    return {
      token,
    };
  }

  async signIn(req: AuthSignInDto): Promise<AuthDto> {
    const { users, totalUsers } = await this.userRepo.findManyAndCountByFilter({
      selectFields: [DB_FIELD.ID, DB_FIELD.EMAIL, DB_FIELD.PASSWORD],
      filterFields: [
        {
          field: DB_FIELD.EMAIL,
          operator: '=',
          value: req.email,
        },
      ],
    });

    if (totalUsers === 0)
      throw new UnauthorizedException('Email or password invalid');

    const user = users[0];
    const isValidPassword = await comparePassword({
      password: req.password,
      hashedPassword: user.password,
    });
    if (!isValidPassword)
      throw new UnauthorizedException('Email or password invalid');

    return this.generateToken({
      sub: user.id,
      email: user.email,
    });
  }
}
