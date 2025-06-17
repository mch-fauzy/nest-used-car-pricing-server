import { Role } from 'src/common/enums/user-role.enum';
import { User } from '../entities/user.entity';

export class UserResponse {
  id!: string;
  email!: string;
  role!: Role;

  static from(data: User): UserResponse {
    return {
      id: data.id,
      email: data.email,
      role: data.role,
    };
  }

  static fromList(datas: User[]): UserResponse[] {
    return datas.map((data) => this.from(data));
  }

  // Use fromData if the input is aggregating from multiple sources
  // static fromData()
}
