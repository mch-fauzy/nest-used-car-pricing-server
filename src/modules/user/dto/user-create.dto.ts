import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { Role } from 'src/common/enums/user-role.enum';
import { authSignUpRequestSchema } from '../../auth/dto/auth-sign-up.dto';

// TODO: jgn extend jika beda module
const userCreateSchema = authSignUpRequestSchema.extend({
  role: z.nativeEnum(Role),
});

export class UserCreateDto extends createZodDto(userCreateSchema) {}
