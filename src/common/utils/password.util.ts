import { hash, compare, genSalt } from 'bcryptjs';

import { AUTH } from 'src/infrastructure/configs/auth.config';
import { PasswordCompare, PasswordHash } from '../interface/password.interface';

export const hashPassword = async ({
  password,
  saltRounds = AUTH.BCRYPT_SALT_ROUNDS,
}: PasswordHash) => {
  const salt = await genSalt(saltRounds);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async ({
  password,
  hashedPassword,
}: PasswordCompare) => {
  const isValidPassword = await compare(password, hashedPassword);
  return isValidPassword;
};
