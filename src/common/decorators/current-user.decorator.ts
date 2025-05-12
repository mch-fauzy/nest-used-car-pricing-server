import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

import { LoggedInUserDto } from '../dto/logged-in-user.dto';
import { ERROR_MESSAGE } from '../constants/error-message.constant';

// NOTE: return type same as passport jwt strategy in valdiate method src/modules/auth/strategies/auth-jwt.strategy.ts
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext): LoggedInUserDto => {
    const request = context.switchToHttp().getRequest();
    const user: LoggedInUserDto | undefined = request.user;

    if (!user) {
      throw new NotFoundException(
        ERROR_MESSAGE.AUTHENTICATED_USER_NOT_FOUND_IN_REQUEST,
      );
    }

    return user;
  },
);
