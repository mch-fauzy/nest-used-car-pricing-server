import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { Role } from 'src/common/enums/user-role.enum';
import { authSignUpSchema } from '../../auth/dto/auth-sign-up.dto';

const userCreateSchema = authSignUpSchema.extend({
  role: z.nativeEnum(Role),
});

export class UserCreateDto extends createZodDto(userCreateSchema) {}
