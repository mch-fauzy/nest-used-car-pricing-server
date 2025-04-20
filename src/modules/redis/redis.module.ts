import { Module } from '@nestjs/common';
import { RedisService } from './services/redis.service';

@Module({
  providers: [RedisService],
  /* Enable service to use by another modules */
  exports: [RedisService],
})
export class RedisModule {}
