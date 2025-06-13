import { createZodDto } from 'nestjs-zod';
import { ERROR_MESSAGE } from 'src/common/constants/error-message.constant';
import { z } from 'zod';

const userByIdSchema = z.object({
  id: z
    .string({
      message: ERROR_MESSAGE.REQUIRED_FIELD,
      invalid_type_error: ERROR_MESSAGE.INVALID_STRING_FIELD,
    })
    .uuid(ERROR_MESSAGE.INVALID_UUID),
});

export class UserByIdDto extends createZodDto(userByIdSchema) {}

/* If params must be is numberic */
// const messageGetByIdParamSchema = z.object({
//   id: z
//     .string()
//     .refine(
//       (value) =>
//         CONSTANT.REGEX.POSITIVE_DIGITS_ONLY.test(value) && Number(value) > 0,
//       'Id must be greater than 0 and contains only digits',
//     ),

//     /* OR */
//     /*

//     id: z.coerce.number().int().positive('Id must be a positive number')

//     */
// });

// export class MessageGetByIdDto extends createZodDto(
//   messageGetByIdParamSchema,
// ) {}
