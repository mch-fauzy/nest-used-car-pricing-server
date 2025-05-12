import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  AuthSignInRequestDto,
  AuthSignInResponseDto,
} from '../dto/auth-sign-in.dto';
import type { JwtTokenPayload } from 'src/common/interface/jwt-payload.interface';
import { DB_FIELD } from 'src/common/constants/db-field.constant';
import { comparePassword } from 'src/common/utils/password.util';
import { User } from 'src/modules/user/entities/user.entity';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { AuthByIdRequestDto } from '../dto/auth-by-id.dto';
import { ERROR_MESSAGE } from 'src/common/constants/error-message.constant';
import { LoggedInUserDto } from '../../../common/dto/logged-in-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private generateToken(payload: JwtTokenPayload): string {
    const { sub, email } = payload;
    const token = this.jwtService.sign({
      sub,
      email,
    });

    return token;
  }

  private async validateUser(req: AuthSignInRequestDto): Promise<User> {
    const { users, totalUsers } =
      await this.userRepository.findManyAndCountByFilter({
        selectFields: [
          DB_FIELD.ID,
          DB_FIELD.EMAIL,
          DB_FIELD.PASSWORD,
          DB_FIELD.ROLE,
        ],
        filterFields: [
          {
            field: DB_FIELD.EMAIL,
            operator: '=',
            value: req.email,
          },
        ],
      });

    if (totalUsers === 0)
      throw new UnauthorizedException(ERROR_MESSAGE.INVALID_EMAIL_PASSWORD);

    const user = users[0];
    const isValidPassword = await comparePassword({
      password: req.password,
      hashedPassword: user.password,
    });
    if (!isValidPassword)
      throw new UnauthorizedException(ERROR_MESSAGE.INVALID_EMAIL_PASSWORD);

    return user;
  }

  async signIn(req: AuthSignInRequestDto): Promise<AuthSignInResponseDto> {
    const validatedUser = await this.validateUser(req);
    const token = this.generateToken({
      sub: validatedUser.id,
      email: validatedUser.email,
    });

    // Transform to response DTO within the service
    return AuthSignInResponseDto.fromEntity({
      user: validatedUser,
      token,
    });
  }

  async getById(req: AuthByIdRequestDto): Promise<LoggedInUserDto> {
    const user = await this.userRepository.findById({
      id: req.id,
    });

    if (!user)
      throw new NotFoundException(ERROR_MESSAGE.AUTHENTICATED_USER_NOT_FOUND);

    return LoggedInUserDto.fromEntity(user);
  }
}
