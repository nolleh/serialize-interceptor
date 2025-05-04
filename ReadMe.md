[![Build Status](https://app.travis-ci.com/nolleh/serialize-interceptor.svg?branch=master)](https://app.travis-ci.com/nolleh/serialize-interceptor)
[![Coverage Status](https://github.com/nolleh/serialize-interceptor/raw/gh-pages/badges/coverage-jest%20coverage.svg?raw=true)](https://nolleh.github.io/serialize-interceptor/badges/coverage-jest%20coverage.svg?raw=true)
[![npm version](https://badge.fury.io/js/serialize-interceptor.svg)](https://badge.fury.io/js/serialize-interceptor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

SerializeInterceptor

Intercept request/response, and deserialize/serialize to dto data.

1. for request, snake -> camel. (you can retrieve dto using camel, for snake cases json input)
2. for response, camel -> snake. (you can send dto using camel, and client retrieve snake case json input)

In short, json layer: snake
model layer: camel

It also works to nested object.

## example

When client send below data,

```json
{
  "name": "nolleh",
  "email": "nolleh7707@gmail.com",
  "some_snake_data": "hello world"
  "live": {
    "country": "South Korea",
    "city": "Seongnam",
    "some_snake_data": "hello world2"
  }
}
```

You can retrieve as (in code)

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

In your main code, put this.
you can check this code from
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

## Customed Serializer (Strategy)

You can put your serialize strategy as you wish, that briefly shown in above snippet.

SerializeInterceptor provides classes to help definition your own class.

```typescript
/** because the regenerated value's field is differ from original,
 * it is hard to declare return type.
 * the input type is also not meaningful.
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

As you can see, implementing class `Strategy` that contains in/out function,
and put it as constructor (by injecting or creating new one),
then the interceptor will work as you defined.

🤔 Is there A strategy that one you want to be provided by this lib?  
let me know!

For now :

| Name         | Desc           | Remark (side effect)                                   | Default                    |
| ------------ | -------------- | ------------------------------------------------------ | -------------------------- |
| snakeToCamel | snake -> camel | dash(-, kebab) also converted to camel                 | default for in (request)   |
| camelToSnake | camel -> snake | starting with capital (pascal) also converted to snake | default for out (response) |
| kebabToCamel | kebab -> camel | X                                                      |                            |
| camelTokebab | camel -> kebab | X                                                      |                            |

⚠️ The default snakeToCamel / camelToSnake has side effect that also converting kebab, pascal.  
considering it's usage, couldn't simply say the side effect is disadvantage.  
But to handle diversity of usage case, there will be soon added additional strategy that doesn't have the effect.

## Dependencies

NestJS

> Designed for NestJS interceptor.
