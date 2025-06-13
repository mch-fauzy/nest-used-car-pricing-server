import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

import { ERROR_MESSAGE } from 'src/common/constants/error-message.constant';
import { User } from 'src/modules/user/entities/user.entity';
import { Role } from 'src/common/enums/user-role.enum';

// Request
const authSignInRequestSchema = z.object({
  email: z
    .string({
      message: ERROR_MESSAGE.REQUIRED_FIELD,
      invalid_type_error: ERROR_MESSAGE.INVALID_STRING_FIELD,
    })
    .email(ERROR_MESSAGE.INVALID_EMAIL),
  password: z.string({
    message: ERROR_MESSAGE.REQUIRED_FIELD,
    invalid_type_error: ERROR_MESSAGE.INVALID_STRING_FIELD,
  }),
});

export class AuthSignInRequestDto extends createZodDto(
  authSignInRequestSchema,
) {}

// Response
class AuthUserResponseDto {
  email!: string;
  role!: Role;

  static fromEntity(data: User): AuthUserResponseDto {
    return {
      email: data.email,
      role: data.role,
    };
  }
}

export class AuthSignInResponseDto {
  token!: string;
  user!: AuthUserResponseDto;

  static fromEntity(data: {
    token: string;
    user: User;
  }): AuthSignInResponseDto {
    return {
      token: data.token,
      user: AuthUserResponseDto.fromEntity(data.user),
    };
  }
}
