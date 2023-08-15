import {
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
  type CallHandler,
  Optional,
} from "@nestjs/common";
import { type Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Strategy, snakeToCamel, camelToSnake } from "strategy";

export const DEFAULT_STRATEGY: Strategy = {
  in: snakeToCamel,
  out: camelToSnake,
};

// where NestInterceptor<T, R>, T is stream of response, R is stream of value
@Injectable()
export class SerializeInterceptor implements NestInterceptor<any, any> {
  constructor(@Optional() readonly strategy: Strategy = DEFAULT_STRATEGY) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.body = this.strategy.in(request.body);

    // handle returns stream..
    return next.handle().pipe(map(this.strategy.out));
  }
}
