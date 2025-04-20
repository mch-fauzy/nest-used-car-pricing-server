import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

import { Role } from 'src/common/enums/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  /* The ! tells TypeScript "Trust me, this field will always be set by TypeORM" */
  id!: string;

  @Column()
  @Index({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  role!: Role;
}
