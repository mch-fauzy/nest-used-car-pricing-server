import { JwtPayload } from 'jsonwebtoken';

export interface JwtTokenPayload extends JwtPayload {
  sub: string;
  email: string;
}
