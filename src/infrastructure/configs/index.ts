import { config } from 'dotenv';

config();
// TODO: dipisah ke beberapa file
export const CONFIG = {
  SERVER: {
    PORT: process.env.SERVER_PORT,
  },
  POSTGRES: {
    HOST: process.env.POSTGRES_HOST,
    PORT: process.env.POSTGRES_PORT,
    DATABASE: process.env.POSTGRES_DATABASE,
    USERNAME: process.env.POSTGRES_USERNAME,
    PASSWORD: process.env.POSTGRES_PASSWORD,
    SYNCHRONIZE: process.env.POSTGRES_SYNCHRONIZE,
  },
  REDIS: {
    URL: process.env.REDIS_URL,
  },
} as const;
