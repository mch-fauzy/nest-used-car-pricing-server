import { createZodDto } from 'nestjs-zod';
import { ERROR_MESSAGE } from 'src/common/constants/error-message.constant';
import { REGEX } from 'src/common/constants/regex.constant';
import { z } from 'zod';

export const authSignUpRequestSchema = z.object({
  email: z
    .string({
      message: ERROR_MESSAGE.REQUIRED_FIELD,
      invalid_type_error: ERROR_MESSAGE.INVALID_STRING_FIELD,
    })
    .email(ERROR_MESSAGE.INVALID_EMAIL),
  password: z
    .string({
      message: ERROR_MESSAGE.REQUIRED_FIELD,
      invalid_type_error: ERROR_MESSAGE.INVALID_STRING_FIELD,
    })
    .min(8, ERROR_MESSAGE.MIN_LENGTH_CHARACTERS(8))
    .regex(REGEX.PASSWORD, {
      message: ERROR_MESSAGE.PASSWORD_CRITERIA,
    }),
});

export class AuthSignUpRequestDto extends createZodDto(
  authSignUpRequestSchema,
) {}
