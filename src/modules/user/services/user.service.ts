import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserCreateDto } from '../dto/user-create.dto';
import { UserRepository } from '../repositories/user.repository';
import { DB_FIELD } from 'src/common/constants/db-field.constant';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UserByIdDto } from '../dto/user-by-id.dto';
import { hashPassword } from 'src/common/utils/password.util';

/*
 * use decorators `@Injectable()` to mark this class as injectable so NestJS can manage and inject it as a provider
 * Enables Dependency Injection (DI).
 * Required for classes that receive constructor-injected dependencies (e.g., AuthService, UserRepository).
 */
// TODO: add return data to every method except removing or deleting method
@Injectable()
export class UserService {
  /* Constructor injected dependencies */
  constructor(private userRepo: UserRepository) {}

  async create(req: UserCreateDto) {
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

  async getList(req: PaginationDto) {
    const { users } = await this.userRepo.findManyAndCountByFilter({
      pagination: {
        page: req.page,
        limit: req.limit,
      },
    });

    return users;
  }

  async getById(req: UserByIdDto) {
    const user = await this.userRepo.findById(req);
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
