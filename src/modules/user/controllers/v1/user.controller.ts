import {
  Controller,
  Get,
  Param,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UserService } from '../../services/user.service';
import { UserByIdDto } from '../../dto/user-by-id.dto';
import { UserResponse } from '../../dto/user.dto';
import { JwtAuthGuard } from 'src/common/guards/auth-jwt.guard';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { LoggedInUserDto } from 'src/common/dto/logged-in-user.dto';
import { UserQueryDto } from '../../dto/user-query.dto';
import {
  ApiResult,
  Paginated,
} from 'src/common/interface/api-response.interface';
import { API_RESPONSE_MESSAGE } from 'src/common/constants/api-response-message.constant';

// TODO: Adjust error handler exception for http, query error and unknown error
@UseGuards(JwtAuthGuard)
@Controller('v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  // TODO: Add search by email or role
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
