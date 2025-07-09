import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Role } from 'src/common/enums/user-role.enum';
import { AuthSignUpRequestDto } from '../../dto/auth-sign-up.dto';
import { UserService } from 'src/modules/user/services/user.service';
import {
  AuthSignInRequestDto,
  AuthSignInResponseDto,
} from '../../dto/auth-sign-in.dto';
import { AuthService } from '../../services/auth.service';
import { ApiResult } from 'src/common/interfaces/api-response.interface';
import { API_RESPONSE_MESSAGE } from 'src/common/constants/api-response-message.constant';

// TODO: implement jwt refresh token https://chatgpt.com/share/6807c8ed-f68c-800c-870a-1a07e7bcf28c
@Controller('v1/auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('sign-up')
  async signUpUser(
    @Body() body: AuthSignUpRequestDto,
  ): Promise<ApiResult<null>> {
    await this.userService.create({
      email: body.email,
      password: body.password,
      role: Role.USER,
    });

    return {
      message: API_RESPONSE_MESSAGE.SUCCESS_REGISTERED,
      data: null,
    };
  }

  /* 
   * On Sign-In
   * Issue:
     - `accessToken` (short-lived, e.g. 15m)
     - `refreshToken` (long-lived, e.g. 7d)
   * Both are signed JWTs — no DB storage 
   */
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() body: AuthSignInRequestDto,
  ): Promise<ApiResult<AuthSignInResponseDto>> {
    const signInResponse = await this.authService.signIn(body);

    return {
      message: API_RESPONSE_MESSAGE.SUCCESS_LOGIN,
      data: signInResponse,
    };
  }

  /*   
   * On Access Token Expiry
     - Frontend calls `/v1/auth/refresh` with `refreshToken`
     - Server verifies token and issues a new accessToken 
   */
  // @Post('refresh')

  /*
   * On Logout
   * Frontend deletes accessToken and refreshToken from storage (e.g. localStorage, or cookies)
   * No backend logic needed, this endpoint does nothing because JWT is stateless
   */
  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  async signOut(): Promise<ApiResult<null>> {
    return {
      message: API_RESPONSE_MESSAGE.SUCCESS_LOGOUT,
      data: null,
    };
  }
}
