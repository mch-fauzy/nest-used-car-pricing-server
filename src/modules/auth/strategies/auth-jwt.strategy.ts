import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AUTH } from 'src/infrastructure/configs/auth.config';
import type { JwtTokenPayload } from 'src/common/interface/jwt-payload.interface';
import { UserRepository } from '../../user/repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepo: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTH.JWT.SECRET,
    });
  }

  /* Auto run below if request token sign is valid */
  async validate(payload: JwtTokenPayload): Promise<JwtTokenPayload> {
    const { sub, email } = payload;
    const user = await this.userRepo.findById({ id: sub });
    if (!user) throw new UnauthorizedException('Token invalid');

    return {
      sub,
      email,
    };
  }
}
