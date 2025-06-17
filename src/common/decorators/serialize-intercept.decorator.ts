import { Type, UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

// Note: Unused
export function SerializeIntercept<T>(dto: Type<T>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
