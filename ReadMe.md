[![Badge](https://app.travis-ci.com/nolleh/serialize-interceptor.svg?branch=master)](https://app.travis-ci.com/nolleh/serialize-interceptor.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/nolleh/serialize-interceptor/badge.svg?branch=master)](https://coveralls.io/github/nolleh/serialize-interceptor?branch=master)
[![npm version](https://badge.fury.io/js/serialize-interceptor.svg)](https://badge.fury.io/js/serialize-interceptor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

SerializeInterceptor

intercept request/response, and deserialize/serialize to dto data.

1. for request, snake -> camel. (you can retrieve dto using camel, for snake cases json input)
2. for response, camel -> snake. (you can send dto using camel, and client retrieve snake case json input)

in short, json layer: snake
model layer: camel

It also works to nested object.


## example 

when client send below data, 
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

you can retrieve as (in code)


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
in your main code, put this.
you can check this code from 
[]("https://github.com/nolleh/serialize-interceptor/test/app.ts")

```typescript

import { SerializeInterceptor } from 'serialize-interceptor';
import { NestFactory } from '@nestjs/core';
...
const app = await NestFactory.create(AppModule);
/** use our interceptor **/
app.useGlobalInterceptors(new SerializeInterceptor);

```

## Dependencies

nestjs
> designed for nestjs interceptor.

