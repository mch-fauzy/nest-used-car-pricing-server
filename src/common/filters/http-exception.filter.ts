import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import type { ResponseWithError } from '../interface/response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as { message: string }).message;

    const errors =
      (typeof exceptionResponse === 'object' &&
        (exceptionResponse as { errors: unknown }).errors) ||
      [];

    const response: ResponseWithError = {
      message,
      errors,
    };

    httpAdapter.reply(ctx.getResponse(), response, status);
  }
}
