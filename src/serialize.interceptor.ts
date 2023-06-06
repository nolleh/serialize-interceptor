import {
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
  type CallHandler,
} from "@nestjs/common";
import { type Observable } from "rxjs";
import { map } from "rxjs/operators";

// where NestInterceptor<T, R>, T is stream of response, R is stream of value
@Injectable()
export class SerializeInterceptor implements NestInterceptor<any, any> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.body = snakeToCamel(request.body);

    // handle returns stream..
    return next.handle().pipe(map((value) => camelToSnake(value)));
  }
}

export function camelToSnake(value: any) {
  if (value === null || value === undefined) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(camelToSnake);
  }

  if (typeof value === "object" && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        key
          .split(/(?=[A-Z])/)
          .join("_")
          .toLowerCase(),
        camelToSnake(value),
      ])
    );
  }
  return value;
}

export function snakeToCamel(value: any) {
  if (value === null || value === undefined) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(snakeToCamel);
  }

  const impl = (str: string) => {
    const converted = str.replace(/([-_]\w)/g, (group) =>
      group[1].toUpperCase()
    );
    return converted[0].toLowerCase() + converted.slice(1);
  };

  if (typeof value === "object" && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        impl(key),
        snakeToCamel(value),
      ])
    );
  }
  return value;
}
