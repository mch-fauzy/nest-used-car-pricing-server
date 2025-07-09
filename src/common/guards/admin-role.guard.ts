import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Role } from '../enums/user-role.enum';
import { ERROR_MESSAGE } from '../constants/error-message.constant';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException(
        ERROR_MESSAGE.AUTHENTICATED_USER_NOT_FOUND_IN_REQUEST,
      );
    }

    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException(ERROR_MESSAGE.ADMIN_ROLE_REQUIRED);
    }

    return true;
  }
}
