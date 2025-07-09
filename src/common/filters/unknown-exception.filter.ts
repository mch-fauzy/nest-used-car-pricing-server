import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import type { ResponseWithError } from '../interfaces/api-response.interface';
import { MESSAGE_RESPONSE } from '../constants/message-response.constant';

@Catch()
export class UnknownExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // TODO: Logger
    const response: ResponseWithError = {
      message: MESSAGE_RESPONSE.ERROR_UNKNOWN,
      errors: [],
    };

    httpAdapter.reply(ctx.getResponse(), response, status);
  }
}
