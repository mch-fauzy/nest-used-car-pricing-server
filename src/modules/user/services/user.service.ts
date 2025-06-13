import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserCreateDto } from '../dto/user-create.dto';
import { UserRepository } from '../repositories/user.repository';
import { DB_FIELD } from 'src/common/constants/db-field.constant';
import { UserByIdDto } from '../dto/user-by-id.dto';
import { hashPassword } from 'src/common/utils/password.util';
import { User } from '../entities/user.entity';
import { UserQueryDto } from '../dto/user-query.dto';
import { UserResponse } from '../dto/user.dto';
import { Paginated } from 'src/common/interface/api-response.interface';
import { PaginationUtil } from 'src/common/utils/pagination.util';

/*
 * use decorators `@Injectable()` to mark this class as injectable so NestJS can manage and inject it as a provider
 * Enables Dependency Injection (DI).
 * Required for classes that receive constructor-injected dependencies (e.g., AuthService, UserRepository).
 */
// TODO: ADD RETURN TYPE (IF NOT NATIVE TYPE) IN CONTROLLER, SERVICE, REPO AND ADD MIDDLEWARE OR UTILS TO response with data (message, data) or response with error (message, errors)
@Injectable()
export class UserService {
  /* Constructor injected dependencies */
  constructor(private userRepo: UserRepository) {}

  async create(req: UserCreateDto): Promise<User> {
    const { totalUsers } = await this.userRepo.findManyAndCountByFilter({
      selectFields: [DB_FIELD.EMAIL],
      filterFields: [
        {
          field: DB_FIELD.EMAIL,
          operator: '=',
          value: req.email,
        },
      ],
    });

    if (totalUsers > 0)
      throw new ConflictException('User with this email already exists'); // The HTTP exception only work on REST API

    const hashedPassword = await hashPassword({ password: req.password });
    return await this.userRepo.create({
      email: req.email,
      password: hashedPassword,
      role: req.role,
    });
  }

  async getList(
    req: UserQueryDto,
  ): Promise<Paginated<UserResponse>> {
    const { users, totalUsers } = await this.userRepo.findManyAndCountByFilter({
      pagination: {
        page: req.page,
        limit: req.limit,
      },
    });

    return {
      metadata: PaginationUtil.mapMetadata({
        count: totalUsers,
        page: req.page,
        perPage: req.limit,
      }),
      items: UserResponse.fromEntities(users),
    };
  }

  async getById(req: UserByIdDto) {
    const user = await this.userRepo.findById({ id: req.id });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async updateById() {
    // check if email duplicate or not
    // check if the user exist or not by id
    // call the update repo (i.e updateById({id, data}))with .save method from typeorm
  }

  async removeById(req: UserByIdDto & { currentUserId: string }) {
    if (req.id === req.currentUserId)
      throw new ForbiddenException('You cannot delete your own account');
    await this.userRepo.deleteById({
      id: req.id,
    });
  }
}
