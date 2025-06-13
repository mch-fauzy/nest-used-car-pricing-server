import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './modules/user/user.module';
import { ReportModule } from './modules/report/report.module';
import { typeOrmConfig } from './infrastructure/database/typeorm-postgres.config';
// import { RedisModule } from './modules/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, APP_PIPE /* APP_INTERCEPTOR */ } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { UnknownExceptionFilter } from './common/filters/unknown-exception.filter';
import { ZodValidationPipe } from 'nestjs-zod';
// import { CurrentUserInterceptor } from './common/interceptors/current-user.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    ReportModule,
    // RedisModule,
    AuthModule,
  ],
  // controllers: [AppController],
  /* The provider that is registered last will have the highest priority. So the most specific filter should be registered last */
  providers: [
    {
      provide: APP_FILTER,
      useClass: UnknownExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor,
    // },
  ],
})
export class AppModule {}
