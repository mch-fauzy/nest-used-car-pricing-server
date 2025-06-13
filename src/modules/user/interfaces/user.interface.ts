import { Role } from 'src/common/enums/user-role.enum';

export interface UserInterface {
  id: string;
  email: string;
  password: string;
  role: Role;
}
