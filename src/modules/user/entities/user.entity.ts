import { Entity, Column, Index } from 'typeorm';

import { Role } from 'src/common/enums/user-role.enum';
import { Base } from 'src/common/entities/base.entity';

@Entity()
export class User extends Base {
  @Column()
  @Index({ unique: true })
  email!: string;

  @Column()
  password!: string;

  /* In db use varchar, set enum in app layer */
  @Column({
    type: 'varchar',
    enum: Role,
    default: Role.USER,
  })
  role!: Role;
}
