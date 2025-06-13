import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

import { Role } from 'src/common/enums/user-role.enum';
import { UserInterface } from '../interfaces/user.interface';

@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  /* The ! tells TypeScript "Trust me, this field will always be set by TypeORM" */
  id!: string;

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
