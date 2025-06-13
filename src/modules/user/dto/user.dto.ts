import { Expose } from 'class-transformer';
import { Role } from 'src/common/enums/user-role.enum';
import { User } from '../entities/user.entity';

// TODO: consideration not using class transformer but use method like fromEntity and fromEntities with input is UserInterface and output is UserDto
// Example in src/common/dto/logged-in-user.dto.ts
export class UserDto {
  @Expose()
  id!: string;

  @Expose()
  email!: string;
}

export class UserResponse {
  email!: string;
  role!: Role;

  static fromEntity(data: User): UserResponse {
    return {
      email: data.email,
      role: data.role,
    };
  }

  static fromEntities(datas: User[]): UserResponse[] {
    return datas.map((data) => this.fromEntity(data));
  }
}
