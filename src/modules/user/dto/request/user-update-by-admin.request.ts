import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { Role } from 'src/common/enums/user-role.enum';
import { ERROR_MESSAGE } from 'src/common/constants/error-message.constant';

const userUpdateByAdminSchema = z.object({
  email: z
    .string({
      invalid_type_error: ERROR_MESSAGE.INVALID_STRING_FIELD,
    })
    .email(ERROR_MESSAGE.INVALID_EMAIL)
    .optional(),
  role: z
    .nativeEnum(Role, {
      errorMap: () => ({
        message: ERROR_MESSAGE.INVALID_ENUM(Object.values(Role)),
      }),
    })
    .optional(),
});

export class UserUpdateByAdminRequest extends createZodDto(
  userUpdateByAdminSchema,
) {}
