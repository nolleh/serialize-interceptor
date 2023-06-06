import { type ExecutionContext } from "@nestjs/common";
import { SerializeInterceptor, camelToSnake, snakeToCamel } from "./index";
import { Observable } from "rxjs";

import { type DeepMockProxy, mockDeep } from "jest-mock-extended";
import { type HttpArgumentsHost } from "@nestjs/common/interfaces";

describe("serialize.interceptor", () => {
  describe("interceptor", () => {
    let interceptor: SerializeInterceptor;
    let executionContext: DeepMockProxy<ExecutionContext>;
    beforeEach(() => {
      interceptor = new SerializeInterceptor();
      executionContext = mockDeep<ExecutionContext>();
    });

    it("should intercept", () => {
      const switchResp = mockDeep<HttpArgumentsHost>();
      const body = new Dto();
      body.StartWithCapital = "StartWithCapital";
      body.camelCase = "camelCase";
      body.snake_case = "snake_case";
      body.nullValue = null;
      switchResp.getRequest.mockReturnValueOnce({ request: { body } });
      executionContext.switchToHttp.mockReturnValueOnce(switchResp);
      // mocking nest js's observable.
      const observer = new Observable((subscriber) => {
        subscriber.next({ request: body });
        subscriber.complete();
      });
      observer.subscribe({
        next(x: any) {
          expect(x.request.StartWithCapital).toBe(body.StartWithCapital);
        },
      });
      interceptor.intercept(executionContext, {
        handle: () => {
          return observer;
        },
      });
    });
  });

  it("camelToSnake test", () => {
    const dto = new Dto();
    dto.StartWithCapital = "StartWithCapital";
    dto.camelCase = "camelCase";
    dto.snake_case = "snake_case";
    dto.array = [1, 2, 3, 4];
    dto.arrayWithCamel = ["have", "a", "nice", "day"];
    dto.nullValue = null;
    dto.date = new Date("2023-05-31T11:43:31.069Z");
    const resp = camelToSnake(dto);

    // expect(resp).toBe(dto);
    expect(resp.start_with_capital).toBe(dto.StartWithCapital);
    expect(resp.camel_case).toBe(dto.camelCase);
    expect(resp.snake_case).toBe(dto.snake_case);
    expect(resp.array).toStrictEqual(dto.array);
    expect(resp.array_with_camel).toStrictEqual(dto.arrayWithCamel);
    expect(resp.date).toBe(dto.date);
  });

  it("nestedObject camelToSnake test", () => {
    const dto = new NestedDto();
    dto.StartWithCapital = "hello";
    dto.camelCase = "camelCase";
    dto.snake_case = "snake_case";
    const nested = new Dto();
    nested.StartWithCapital = "StartWithCapital";
    nested.camelCase = "camelCase";
    nested.snake_case = "snake_case";
    dto.nested = nested;

    const resp = camelToSnake(dto);
    expect(resp.start_with_capital).toBe(dto.StartWithCapital);
    expect(resp.camel_case).toBe(dto.camelCase);
    expect(resp.snake_case).toBe(dto.snake_case);

    expect(resp.nested.start_with_capital).toBe(dto.nested.StartWithCapital);
    expect(resp.nested.camel_case).toBe(dto.nested.camelCase);
    expect(resp.nested.snake_case).toBe(dto.nested.snake_case);
  });

  it("snakeToCamel test", () => {
    const dto = new Dto();
    dto.StartWithCapital = "StartWithCapital";
    dto.camelCase = "camelCase";
    dto.snake_case = "snake_case";
    dto.arrayWithCamel = ["array", "with", "camel"];
    dto.array_with_snake = ["array", "with", "snake"];
    dto.nullValue = null;
    dto.date = new Date("2023-05-31T11:43:31.069Z");
    const resp = snakeToCamel(dto);

    expect(resp.startWithCapital).toBe(dto.StartWithCapital);
    expect(resp.camelCase).toBe(dto.camelCase);
    expect(resp.snakeCase).toBe(dto.snake_case);
    expect(resp.arrayWithCamel).toStrictEqual(dto.arrayWithCamel);
    expect(resp.arrayWithSnake).toStrictEqual(dto.array_with_snake);
    expect(resp.date).toBe(dto.date);
  });

  it("nestedObject snakeToCamel test", () => {
    const dto = new NestedDto();
    dto.StartWithCapital = "hello";
    dto.camelCase = "camelCase";
    dto.snake_case = "snake_case";
    const nested = new Dto();
    nested.StartWithCapital = "StartWithCapital";
    nested.camelCase = "camelCase";
    nested.snake_case = "snake_case";
    dto.nested = nested;

    const resp = snakeToCamel(dto);
    expect(resp.startWithCapital).toBe(dto.StartWithCapital);
    expect(resp.camelCase).toBe(dto.camelCase);
    expect(resp.snakeCase).toBe(dto.snake_case);

    expect(resp.nested.startWithCapital).toBe(dto.nested.StartWithCapital);
    expect(resp.nested.camelCase).toBe(dto.nested.camelCase);
    expect(resp.nested.snakeCase).toBe(dto.nested.snake_case);
  });
});

class Dto {
  StartWithCapital: string;
  camelCase: string;
  snake_case: string;
  array: number[];
  arrayWithCamel: string[];
  array_with_snake: string[];
  nullValue: null;
  date: Date;
}

class NestedDto {
  StartWithCapital: string;
  camelCase: string;
  snake_case: string;
  nested: Dto;
}
