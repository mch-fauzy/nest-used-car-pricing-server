import { createZodDto } from 'nestjs-zod';
import { ERROR_MESSAGE } from 'src/common/constants/error-message.constant';
import { REGEX } from 'src/common/constants/regex.constant';
import { z } from 'zod';

const userUpdateOwnDataSchema = z.object({
  email: z
    .string({
      invalid_type_error: ERROR_MESSAGE.INVALID_STRING_FIELD,
    })
    .email(ERROR_MESSAGE.INVALID_EMAIL)
    .optional(),
  password: z
    .string({
      invalid_type_error: ERROR_MESSAGE.INVALID_STRING_FIELD,
    })
    .min(8, ERROR_MESSAGE.MIN_LENGTH_CHARACTERS(8))
    .regex(REGEX.PASSWORD, {
      message: ERROR_MESSAGE.PASSWORD_CRITERIA,
    })
    .optional(),
});

export class UserUpdateOwnDataRequest extends createZodDto(
  userUpdateOwnDataSchema,
) {}
