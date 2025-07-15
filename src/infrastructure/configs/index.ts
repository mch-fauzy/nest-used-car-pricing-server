import { config } from 'dotenv';

config();
// TODO: dipisah ke beberapa file
export const CONFIG = {
  SERVER: {
    PORT: process.env.SERVER_PORT,
    TIMEZONE: process.env.POSTGRES_TIMEZONE || 'UTC',
  },
  POSTGRES: {
    HOST: process.env.POSTGRES_HOST,
    PORT: Number(process.env.POSTGRES_PORT) || 3000,
    DATABASE: process.env.POSTGRES_DATABASE,
    USERNAME: process.env.POSTGRES_USERNAME,
    PASSWORD: process.env.POSTGRES_PASSWORD,
    SYNCHRONIZE: process.env.POSTGRES_SYNCHRONIZE === 'true',
    SSL: process.env.POSTGRES_SSL === 'true',
    SSL_REJECT_UNAUTHORIZED:
      process.env.POSTGRES_SSL_REJECT_UNAUTHORIZED === 'true',
  },
  REDIS: {
    URL: process.env.REDIS_URL,
  },
} as const;
