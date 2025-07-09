export interface PasswordHash {
  password: string;
  saltRounds?: number;
}

export interface PasswordCompare {
  password: string;
  hashedPassword: string;
}
