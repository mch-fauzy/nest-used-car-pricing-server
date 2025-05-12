import {
  type NestInterceptor,
  type ExecutionContext,
  type CallHandler,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../../modules/user/services/user.service';
import { Observable } from 'rxjs';
import { JwtTokenPayload } from 'src/common/interface/jwt-payload.interface';

// NOTE: Currently unused, because using passport in src/modules/auth/strategies/auth-jwt.strategy.ts
@Injectable()
export class CurrentUserInterceptor<T> implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Promise<Observable<T>> {
    const request = context.switchToHttp().getRequest();
    const { user }: { user?: JwtTokenPayload } = request;

    if (user) {
      const loggedUser = await this.userService.getById({ id: user.sub });
      request.currentUser = loggedUser;
    }

    return next.handle();
  }
}
