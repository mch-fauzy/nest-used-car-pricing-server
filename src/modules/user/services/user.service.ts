import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { UserCreateDto } from '../dto/user-create.dto';
import { UserRepository } from '../repositories/user.repository';
import { DB_FIELD } from 'src/common/constants/db-field.constant';
import { UserByIdDto } from '../dto/user-by-id.dto';
import { hashPassword } from 'src/common/utils/password.util';
import { UserQueryDto } from '../dto/user-query.dto';
import { UserResponse } from '../dto/user.dto';
import { Paginated } from 'src/common/interface/api-response.interface';
import { PaginationUtil } from 'src/common/utils/pagination.util';
import { ERROR_MESSAGE } from 'src/common/constants/error-message.constant';
import { LoggedInUserDto } from 'src/common/dto/logged-in-user.dto';

/*
 * use decorators `@Injectable()` to mark this class as injectable so NestJS can manage and inject it as a provider
 * Enables Dependency Injection (DI).
 * Required for classes that receive constructor-injected dependencies (e.g., AuthService, UserRepository).
 */
@Injectable()
export class UserService {
  /* Constructor injected dependencies */
  constructor(private readonly userRepo: UserRepository) {}

  async create(req: UserCreateDto): Promise<void> {
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
      throw new ConflictException(
        ERROR_MESSAGE.EMAIL_ALREADY_EXISTS(req.email),
      ); // The HTTP exception only work on REST API

    const hashedPassword = await hashPassword({ password: req.password });
    await this.userRepo.create({
      email: req.email,
      password: hashedPassword,
      role: req.role,
    });
  }

  async getList(
    req: UserQueryDto,
    loggedInUser: LoggedInUserDto,
  ): Promise<Paginated<UserResponse>> {
    const { users, totalUsers } = await this.userRepo.findManyAndCountByFilter({
      filterFields: [
        // Exclude logged user in list
        {
          field: DB_FIELD.ID,
          operator: '!=',
          value: loggedInUser.id,
        },
      ],
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
      items: UserResponse.fromList(users),
    };
  }

  async getById(req: UserByIdDto): Promise<UserResponse> {
    const user = await this.userRepo.findOrFailById({ id: req.id });

    return UserResponse.from(user);
  }

  async updateById() {
    // check if email duplicate or not
    // check if the user exist or not by id
    // call the update repo (i.e updateById({id, data}))with .save method from typeorm
  }

  async removeById(
    req: UserByIdDto,
    loggedInUser: LoggedInUserDto,
  ): Promise<void> {
    if (req.id === loggedInUser.id)
      throw new ForbiddenException(ERROR_MESSAGE.CANNOT_DELETE_OWN_ACCOUNT);

    await this.userRepo.deleteById({
      id: req.id,
    });
  }
}
