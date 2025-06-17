import {
  Controller,
  Get,
  Param,
  Query,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

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

@UseGuards(JwtAuthGuard)
@Controller('v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getList(
    @Query() query: UserQueryDto,
  ): Promise<ApiResult<Paginated<UserResponse>>> {
    const response = await this.userService.getList(query);
    return {
      message: API_RESPONSE_MESSAGE.SUCCESS_GET_DATA('users'),
      data: response,
    };
  }

  // NOTE: loggedInUser return type same as decorators
  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  // TODO: ADD RETURN TYPE (IF NOT NATIVE TYPE) IN CONTROLLER, SERVICE, REPO AND ADD MIDDLEWARE OR UTILS TO response with data (message, data) or response with error (message, errors)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeById(@Param() params: UserByIdDto, @Req() req: Request) {
    // const currentUser = LoggedInUserDto.fromRequest(req);
    // await this.userService.removeById({
    //   id: params.id,
    //   currentUserId: currentUser.sub,
    // });
    // return responseWithData({ message: MESSAGE_RESPONSE.SUCCESS, data: null });
  }
}
