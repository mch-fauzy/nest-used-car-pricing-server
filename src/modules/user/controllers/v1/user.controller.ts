import {
  Controller,
  Get,
  Param,
  Query,
  Delete,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';

import { UserService } from '../../services/user.service';
import { UserByIdDto } from '../../dto/user-by-id.dto';
import { UserResponse } from '../../dto/user.dto';
import { JwtAuthGuard } from 'src/common/guards/auth-jwt.guard';
import { AdminRoleGuard } from 'src/common/guards/admin-role.guard';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { LoggedInUserDto } from 'src/common/dto/logged-in-user.dto';
import { UserQueryDto } from '../../dto/user-query.dto';
import {
  ApiResult,
  Paginated,
} from 'src/common/interfaces/api-response.interface';
import { API_RESPONSE_MESSAGE } from 'src/common/constants/api-response-message.constant';
import { UserUpdateByAdminRequest } from '../../dto/request/user-update-by-admin.request';
import { UserUpdateOwnDataRequest } from '../../dto/request/user-update-own-data.request';

// TODO: Adjust error handler exception for http, query error and unknown error
@UseGuards(JwtAuthGuard)
@Controller('v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  // TODO: Add search by email or role
  @UseGuards(AdminRoleGuard)
  @Get()
  async getList(
    @Query() query: UserQueryDto,
    @CurrentUser() loggedInUser: LoggedInUserDto,
  ): Promise<ApiResult<Paginated<UserResponse>>> {
    const response = await this.userService.getList(query, loggedInUser);
    return {
      message: API_RESPONSE_MESSAGE.SUCCESS_GET_DATA('users'),
      data: response,
    };
  }

  // NOTE: loggedInUser return type same as decorators
  @Get('me')
  async getCurrentUser(
    @CurrentUser() loggedInUser: LoggedInUserDto,
  ): Promise<ApiResult<UserResponse>> {
    const response = await this.userService.getById({
      id: loggedInUser.id,
    });
    return {
      message: API_RESPONSE_MESSAGE.SUCCESS_GET_DATA('own user'),
      data: response,
    };
  }

  @UseGuards(AdminRoleGuard)
  @Get(':id')
  async getById(
    @Param() params: UserByIdDto,
  ): Promise<ApiResult<UserResponse>> {
    const response = await this.userService.getById({
      id: params.id,
    });

    return {
      message: API_RESPONSE_MESSAGE.SUCCESS_GET_DATA('user'),
      data: response,
    };
  }

  @UseGuards(AdminRoleGuard)
  @Patch(':id')
  async updateById(
    @Param() params: UserByIdDto,
    @Body() body: UserUpdateByAdminRequest,
    @CurrentUser() loggedInUser: LoggedInUserDto,
  ): Promise<ApiResult<UserResponse>> {
    const response = await this.userService.updateById(
      params,
      body,
      loggedInUser,
    );

    return {
      message: API_RESPONSE_MESSAGE.SUCCESS_UPDATE_DATA('user'),
      data: response,
    };
  }

  @Patch('me')
  async updateOwnData(
    @Body() body: UserUpdateOwnDataRequest,
    @CurrentUser() loggedInUser: LoggedInUserDto,
  ): Promise<ApiResult<UserResponse>> {
    const response = await this.userService.updateOwnData(body, loggedInUser);

    return {
      message: API_RESPONSE_MESSAGE.SUCCESS_UPDATE_DATA('own user data'),
      data: response,
    };
  }

  @UseGuards(AdminRoleGuard)
  @Delete(':id')
  async removeById(
    @Param() params: UserByIdDto,
    @CurrentUser() loggedInUser: LoggedInUserDto,
  ): Promise<ApiResult<null>> {
    await this.userService.removeById(
      {
        id: params.id,
      },
      loggedInUser,
    );

    return {
      message: API_RESPONSE_MESSAGE.SUCCESS_DELETE_DATA('user'),
      data: null,
    };
  }
}
