import { camelToSnake, snakeToCamel } from "./serialize.interceptor";

describe("serialize.interceptor", () => {
  beforeEach(() => {});

  it("camelToSnake test", () => {
    const dto = new Dto();
    dto.StartWithCapital = "StartWithCapital";
    dto.camelCase = "camelCase";
    dto.snake_case = "snake_case";
    const resp = camelToSnake(dto);

    expect(resp.start_with_capital).toBe(dto.StartWithCapital);
    expect(resp.camel_case).toBe(dto.camelCase);
    expect(resp.snake_case).toBe(dto.snake_case);
  });

  it("nestedObject camelToSnake test", () => {
    const dto = new NestedDto();
    dto.StartWithCapital = 1;
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
    const resp = snakeToCamel(dto);

    expect(resp.startWithCapital).toBe(dto.StartWithCapital);
    expect(resp.camelCase).toBe(dto.camelCase);
    expect(resp.snakeCase).toBe(dto.snake_case);
  });

  it("nestedObject snakeToCamel test", () => {
    const dto = new NestedDto();
    dto.StartWithCapital = 1;
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
  StartWithCapital;
  camelCase;
  snake_case;
}

class NestedDto {
  StartWithCapital;
  camelCase;
  snake_case;
  nested;
}
