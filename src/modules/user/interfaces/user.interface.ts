import { Role } from 'src/common/enums/user-role.enum';
import { BaseModel } from 'src/common/interfaces/base-model.interface';

export interface UserModel extends BaseModel {
  email: string;
  password: string;
  role: Role;
}
