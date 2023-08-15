import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

import { APP_INTERCEPTOR } from "@nestjs/core";
import { DEFAULT_STRATEGY, SerializeInterceptor } from "serialize.interceptor";

import { Strategy, snakeToCamel, camelToSnake } from "strategy";

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SerializeInterceptor,
    },
    {
      provide: Strategy,
      useFactory: () => ({
        in: DEFAULT_STRATEGY.in,
        out: (v) => {
          // return 'test-swallow up!';
          // return snakeToCamel(v);
          return camelToSnake(v);
        },
      }),
    },
  ],
})
export class AppModule {}
