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
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UserByIdDto } from '../../dto/user-by-id.dto';
import { UserDto } from '../../dto/user.dto';
import { SerializeIntercept } from 'src/common/interceptors/serialize.interceptor';
import { responseWithData } from 'src/common/utils/response.util';
import { MESSAGE_RESPONSE } from 'src/common/constants/message-response.constant';
import { JwtAuthGuard } from 'src/common/guards/auth-jwt.guard';
import { LoggedInUserDto } from 'src/common/dto/logged-in-user.dto';

@Controller('v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @SerializeIntercept(UserDto) // Intercept response and map the response based on expose decorator on dto (i.e, dto/user.dto.ts), you can put the intercept in each specific route
  @Get()
  async getList(@Query() query: PaginationDto) {
    const response = await this.userService.getList(query);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @SerializeIntercept(UserDto)
  @Get('me')
  async getCurrentUser(@Req() req: Request) {
    const currentUser = LoggedInUserDto.fromRequest(req);
    const response = await this.userService.getById({
      id: currentUser.sub,
    });
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @SerializeIntercept(UserDto)
  @Get(':id')
  async getById(@Param() params: UserByIdDto) {
    const response = await this.userService.getById(params);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeById(@Param() params: UserByIdDto, @Req() req: Request) {
    const currentUser = LoggedInUserDto.fromRequest(req);
    await this.userService.removeById({
      ...params,
      currentUserId: currentUser.sub,
    });

    return responseWithData({ message: MESSAGE_RESPONSE.SUCCESS, data: null });
  }
}
