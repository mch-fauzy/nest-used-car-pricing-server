import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { CONFIG } from 'src/infrastructure/configs';

// TODO: maybe use redis as decorator?
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  /* Redis is required, will throw error if not provided */
  private client!: Redis;
  onModuleInit() {
    this.client = new Redis(CONFIG.REDIS.URL!, {
      maxRetriesPerRequest: 5,
    });

    this.client.on('error', (err) => {
      console.error('Redis connection error:', err.message);
      throw new Error('Failed to connect to Redis. Ensure Redis is running.');
    });
  }

  onModuleDestroy() {
    void this.client.quit();
  }

  async set(key: string, value: string, ttlInSeconds: number) {
    await this.client.set(key, value, 'EX', ttlInSeconds); // 'EX' sets an expiration time
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async delete(key: string) {
    return this.client.del(key);
  }
}
