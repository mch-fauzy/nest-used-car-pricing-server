import { createZodDto } from 'nestjs-zod';
import { ERROR_MESSAGE } from 'src/common/constants/error-message.constant';
import { z } from 'zod';

const authByIdRequestSchema = z.object({
  id: z
    .string({
      message: ERROR_MESSAGE.REQUIRED_FIELD,
      invalid_type_error: ERROR_MESSAGE.INVALID_STRING_FIELD,
    })
    .uuid(ERROR_MESSAGE.INVALID_UUID),
});

export class AuthByIdRequestDto extends createZodDto(authByIdRequestSchema) {}
