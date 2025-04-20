import { config } from 'dotenv';

config();
export const AUTH = {
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  JWT: {
    SECRET: process.env.JWT_SECRET_KEY || 'P0lk7@#nasd3rc',
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || 60 * 60,
  },
} as const;
