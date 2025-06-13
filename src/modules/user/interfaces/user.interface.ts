import { Role } from 'src/common/enums/user-role.enum';

export interface UserModel {
  id: string;
  email: string;
  password: string;
  role: Role;
}
