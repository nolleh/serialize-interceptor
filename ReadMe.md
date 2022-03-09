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

import { SerializeInterceptor } from 'serialize.interceptor';
import { NestFactory } from '@nestjs/core';
...
const app = await NestFactory.create(AppModule);
/** use our interceptor **/
app.useGlobalInterceptors(new SerializeInterceptor);

```

## Dependencies

nestjs
> designed for nestjs interceptor.

