import { Base } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Report extends Base {
  @Column()
  price!: number;
}
