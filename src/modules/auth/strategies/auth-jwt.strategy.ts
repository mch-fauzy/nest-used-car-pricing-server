import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AUTH } from 'src/infrastructure/configs/auth.config';
import type { JwtTokenPayload } from 'src/common/interface/jwt-payload.interface';
import { AuthService } from '../services/auth.service';
import { LoggedInUserDto } from '../../../common/dto/logged-in-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTH.JWT.SECRET,
    });
  }

  /* Auto run below if request token sign is valid and assign to request*/
  async validate(payload: JwtTokenPayload): Promise<LoggedInUserDto> {
    const { sub } = payload;
    const user = await this.authService.getById({ id: sub });
    return user;
  }
}
