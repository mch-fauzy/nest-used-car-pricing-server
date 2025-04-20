import { Request } from 'express';
import { JwtTokenPayload } from '../interface/jwt-payload.interface';

export class LoggedInUserDto {
  readonly sub!: string;

  readonly email!: string;

  static fromRequest(req: Request): LoggedInUserDto {
    const user = req.user as JwtTokenPayload;
    return {
      sub: user.sub,
      email: user.email,
    };
  }
}
