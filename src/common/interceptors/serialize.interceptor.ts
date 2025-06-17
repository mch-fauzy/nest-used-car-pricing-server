import {
  type NestInterceptor,
  type ExecutionContext,
  type CallHandler,
  type Type,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { MESSAGE_RESPONSE } from '../constants/message-response.constant';

/* Note/To Do:
 * Will not used, use return type directly and using fromEntity or fromEntities method in service instead. e.g: UserResponse.from(userData)
 */

/*
 * Serialization is a process that happens before objects are returned in a network response. This is an appropriate place to provide rules for transforming and sanitizing the data to be returned to the client. For example, sensitive data like passwords should always be excluded from the response. Or, certain properties might require additional transformation, such as sending only a subset of properties of an entity
 * source: https://docs.nestjs.com/techniques/serialization
 * TLDR: Mapping response into specific DTO response
 */

interface ResponseWithData {
  message: string;
  data: unknown;
}

export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private dto: Type<T>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseWithData> {
    // Run something before a request is handled by the request handler/controller
    // console.log(`I am running before the handler ${context}`)

    return next.handle().pipe(
      map((data: T) => {
        // Run something before the response is sent out to client
        // console.log( `I am running before the response is sent out ${data}`)

        const dataInClassObject = plainToInstance(this.dto, data, {
          excludeExtraneousValues: true, // Only expose specific field based on decorators @Expose or @Exclude
        });

        return {
          message: MESSAGE_RESPONSE.SUCCESS,
          data: dataInClassObject,
        };
      }),
    );
  }
}
