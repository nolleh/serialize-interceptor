import { Injectable } from "@nestjs/common";
import { map } from "rxjs/operators";

// where NestInterceptor<T, R>, T is stream of response, R is stream of value
@Injectable()
export class SerializeInterceptor {
  intercept(context, next) {
    let request = context.switchToHttp().getRequest();
    // console.log(request.body);
    request.body = snakeToCamel(request.body);
    // console.log(request.body);

    // handle returns stream..
    return (
      next
        .handle()
        //.pipe(map(value => JSON.stringify(value).split(/(?=[A-Z])/).join('_').toLowerCase()));
        .pipe(map((value) => camelToSnake(value)))
    );
  }
}

export function camelToSnake(value: any) {
  if (value === null || value === undefined) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(camelToSnake);
  }

  if (typeof value === "object") {
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

  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        impl(key),
        snakeToCamel(value),
      ])
    );
  }
  return value;
}

function recursivelyStripNullValues(value: any) {
  if (Array.isArray(value)) {
    return value.map(recursivelyStripNullValues);
  }
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        key,
        recursivelyStripNullValues(value),
      ])
    );
  }
  if (value !== null) {
    return value;
  }
}
