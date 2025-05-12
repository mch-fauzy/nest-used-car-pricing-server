import { Request } from 'express';
import { JwtTokenPayload } from '../interface/jwt-payload.interface';

// NOTE: you can use this or custom decorator in src/modules/user/decorators/current-user.decorator.ts and dto in src/common/dto/logged-in-user.dto.ts
export class LoggedInUserOldDto {
  readonly sub!: string;

  readonly email!: string;

  static fromRequest(req: Request): LoggedInUserOldDto {
    const user = req.user as JwtTokenPayload;
    return {
      sub: user.sub,
      email: user.email,
    };
  }
}
