import { User } from 'src/modules/user/entities/user.entity';
import { Role } from '../enums/user-role.enum';

export class LoggedInUserDto {
  id!: string;
  email!: string;
  role!: Role;

  static fromEntity(data: User): LoggedInUserDto {
    return {
      id: data.id,
      email: data.email,
      role: data.role,
    };
  }
}
