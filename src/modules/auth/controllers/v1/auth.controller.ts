import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Role } from 'src/common/enums/user-role.enum';
import { AuthSignUpDto } from '../../dto/auth-sign-up.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { SerializeIntercept } from 'src/common/interceptors/serialize.interceptor';
import { AuthSignInDto } from '../../dto/auth-sign-in.dto';
import { AuthService } from '../../services/auth.service';
import { AuthDto } from '../../dto/auth.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @SerializeIntercept(AuthSignUpDto)
  @Post('/sign-up')
  async signUpUser(@Body() body: AuthSignUpDto) {
    const response = await this.userService.create({
      email: body.email,
      password: body.password,
      role: Role.USER,
    });

    return response;
  }

  @SerializeIntercept(AuthDto)
  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async signIn(@Body() body: AuthSignInDto) {
    const response = await this.authService.signIn(body);
    return response;
  }
}
