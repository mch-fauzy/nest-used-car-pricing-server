import { Expose } from 'class-transformer';
import { createZodDto } from 'nestjs-zod';
import { Role } from 'src/common/enums/user-role.enum';
import { z } from 'zod';

export const authSignUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export class AuthSignUpDto extends createZodDto(authSignUpSchema) {
  @Expose()
  id!: string;

  @Expose()
  email!: string;

  @Expose()
  role!: Role;
}
