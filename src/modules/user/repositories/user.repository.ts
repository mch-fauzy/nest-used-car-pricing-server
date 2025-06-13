import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import type { Filter } from 'src/common/interface/filter.interface';
import { UserInterface } from '../interfaces/user.interface';

/*
 * use decorators `@Injectable()` to mark this class as injectable so NestJS can manage and inject it as a provider
 * Enables Dependency Injection (DI).
 * Required for classes that receive constructor-injected dependencies (e.g., AuthService, UserRepository).
 */
@Injectable()
export class UserRepository {
  /*
   * Constructor injected dependencies
   * This is what is going to tell the dependency injection system that we need the user repository
   * So this decorator is required simply because we have to use a generic type right here <User>
   */
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(data: Omit<UserInterface, 'id'>): Promise<User> {
    /* .create will create an instance of User and not commit to db */
    const user = this.userRepo.create(data);

    /* Commit to db
     * By using create then save, we can use hooks like AfterInsert, BeforeInsert
     * The cons is it will take 2 db calls same as update
     */
    return await this.userRepo.save(user);
  }

  async findById(primaryId: Pick<UserInterface, 'id'>): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ id: primaryId.id });
    return user;
  }

  async deleteById(primaryId: Pick<UserInterface, 'id'>): Promise<void> {
    const user = await this.findById(primaryId);
    if (!user) throw new NotFoundException('User not found'); // The HTTP exception only work on REST API

    await this.userRepo.remove(user);
  }

  async updateById(
    primaryId: Pick<UserInterface, 'id'>,
    data: Omit<UserInterface, 'id'>,
  ): Promise<void> {
    const user = await this.findById(primaryId);
    if (!user) throw new NotFoundException('User not found');

    await this.userRepo.save(Object.assign(user, data));
  }

  async findManyAndCountByFilter(
    filter: Filter,
  ): Promise<{ users: User[]; totalUsers: number }> {
    const { selectFields, filterFields, pagination, sorts } = filter;

    const queryKey = 'user';
    const qb = this.userRepo.createQueryBuilder(queryKey);

    /* Handle select specific fields */
    if (selectFields?.length) {
      /* Use .map when you want to produce a new array */
      const fields = selectFields.map((field) => `${queryKey}.${field}`);
      qb.select(fields);
    }

    /* Handle filter fields */
    if (filterFields?.length) {
      filterFields.forEach(({ field, operator, value }, index) => {
        const paramKey = `${field}_${index}`;
        const condition = `${queryKey}.${field} ${operator} :${paramKey}`;

        /* Use WHERE if first condition, otherwise use AND WHERE */
        if (index === 0) {
          qb.where(condition, { [paramKey]: value });
        } else {
          qb.andWhere(condition, { [paramKey]: value });
        }
      });
    }

    /* Handle sort */
    if (sorts?.length) {
      sorts.forEach(({ field, order }) => {
        qb.addOrderBy(`${queryKey}.${field}`, order);
      });
    }

    /* Handle pagination */
    if (pagination) {
      const { page, limit } = pagination;
      qb.skip((page - 1) * limit).take(limit);
    }

    const [users, totalUsers] = await qb.getManyAndCount();

    /* To inspect the query built by TypeORM's QueryBuilder and check for parameter name */
    // const [sql, parameters] = qb.getQueryAndParameters();
    // console.log('Generated SQL:', sql);
    // console.log('Parameters:', parameters);
    // console.log(users, totalUsers)

    return { users, totalUsers };
  }
}
