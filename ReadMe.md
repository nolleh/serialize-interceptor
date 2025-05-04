[![Build Status](https://app.travis-ci.com/nolleh/serialize-interceptor.svg?branch=master)](https://app.travis-ci.com/nolleh/serialize-interceptor)
[![Coverage Status](https://github.com/nolleh/serialize-interceptor/raw/gh-pages/badges/coverage-jest%20coverage.svg?raw=true)](https://nolleh.github.io/serialize-interceptor/badges/coverage-jest%20coverage.svg?raw=true)
[![npm version](https://badge.fury.io/js/serialize-interceptor.svg)](https://badge.fury.io/js/serialize-interceptor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

SerializeInterceptor

Intercepts request/response data and deserializes/serializes to DTO format.

1. For requests: converts snake_case to camelCase (you can use camelCase in your DTO while accepting snake_case JSON input)
2. For responses: converts camelCase to snake_case (you can use camelCase in your DTO while sending snake_case JSON to clients)

In summary:

- JSON layer: snake_case
- Model layer: camelCase

This conversion works for nested objects as well.

## Example

When a client sends the following data:

```json
{
  "name": "nolleh",
  "email": "nolleh7707@gmail.com",
  "some_snake_data": "hello world",
  "live": {
    "country": "South Korea",
    "city": "Seongnam",
    "some_snake_data": "hello world2"
  }
}
```

You can access it in your code as:

```typescript
class LiveDto {
  country,
  city,
  someSnakeData
}

class MyDto {
  name,
  email,
  someSnakeData,
  live,
}
```

## Usage

Add this to your main code.
You can find the complete example at:
[]("https://github.com/nolleh/serialize-interceptor/test/app.ts")

```typescript

import { SerializeInterceptor } from 'serialize-interceptor';
import { NestFactory } from '@nestjs/core';
...
const app = await NestFactory.create(AppModule);
/** use our interceptor **/
app.useGlobalInterceptors(new SerializeInterceptor);

// @since 1.1.5
// if you want to customize serializer, then put your strategy.
// const strategy: Strategy = {
//   in: DEFAULT_STRATEGY.in,
//   out: (v) => {
//     // return 'test-swallow up!';
//     return snakeToCamel(v)
//   },
// };
// app.useGlobalInterceptors(new SerializeInterceptor(strategy));
```

OR in module

```typescript
@Module({
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SerializeInterceptor,
    },

    /**  @since 1.1.5
    // if you want to customize serializer, then put your strategy.
    {
      provide: Strategy,
      useFactory: () => ({
        in: DEFAULT_STRATEGY.in,
        out: (v) => {
          // return 'test-swallow up!';
          // your custom func. the default for 'out' is.. snakeToCamel.
          return snakeToCamel(v);
        },
      }),
    },
    **/
})

export class AppModule {}
```

## Custom Serializer (Strategy)

You can define your own serialization strategy as shown in the snippets above.

SerializeInterceptor provides classes to help you define your own strategy:

```typescript
/** Since the regenerated value's fields differ from the original,
 * it's challenging to declare the return type.
 * The input type is also not meaningful.
 *
 * in: request layer (default: snakeToCamel),
 * out: response layer (default: camelToSnake).
 *
 * i.e. const DEFAULT_STRATEGY: Strategy = { in: snakeToCamel, out: camelToSnake };
 */
export class Strategy {
  in: (value: any) => any;
  out: (value: any) => any;
}
export const DEFAULT_STRATEGY: Strategy = {
  in: snakeToCamel,
  out: camelToSnake,
};
```

As shown above, implement the `Strategy` class with in/out functions,
and provide it as a constructor (either through injection or by creating a new instance).
The interceptor will then work according to your definition.

🤔 Do you need a specific strategy that you'd like to see provided by this library?  
Let me know!

Available strategies:

| Name          | Description    | Remark (side effect)                                   | Default                    |
| ------------- | -------------- | ------------------------------------------------------ | -------------------------- |
| snakeToCamel  | snake -> camel | dash(-, kebab) also converted to camel                 | default for in (request)   |
| camelToSnake  | camel -> snake | starting with capital (pascal) also converted to snake | default for out (response) |
| kebabToCamel  | kebab -> camel | No side effects                                        |                            |
| camelToKebab  | camel -> kebab | No side effects                                        |                            |
| camelTosnake2 | camel ↔ snake | without kebab side effects                             |                            |
| snakeToCamel2 | snake -> camel | without kebab side effects                             |                            |

⚠️ The default snakeToCamel / camelToSnake has side effects that also convert kebab-case and PascalCase.  
While these side effects can be useful in many cases, they might not be desirable in all situations.

## Dependencies

NestJS

> Designed for NestJS interceptor.
