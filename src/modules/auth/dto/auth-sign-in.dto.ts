import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

import { ERROR_MESSAGE } from 'src/common/constants/error-message.constant';
import { UserResponseDto } from 'src/modules/user/dto/user.dto';
import { User } from 'src/modules/user/entities/user.entity';

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
export class AuthSignInResponseDto {
  token!: string;
  user!: UserResponseDto;

  static fromEntity(data: {
    token: string;
    user: User;
  }): AuthSignInResponseDto {
    return {
      token: data.token,
      user: UserResponseDto.fromEntity(data.user),
    };
  }
}
