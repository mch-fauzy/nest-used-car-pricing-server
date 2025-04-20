import { Expose } from 'class-transformer';

export class AuthDto {
  @Expose()
  token!: string;
}
