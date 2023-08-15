// test app
import { type INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
// import { SerializeInterceptor, DEFAULT_STRATEGY } from "serialize.interceptor";
// import { Strategy } from "strategy";
// for testcode
//
async function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle("interceptor test Docs")
    .setDescription("serialize.interceptor test")
    .setVersion("0.0.1")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api-docs", app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  // app.useGlobalInterceptors(new SerializeInterceptor());
  // const strategy: Strategy = {
  //   in: DEFAULT_STRATEGY.in,
  //   out: (v) => {
  //     // return 'test-swallow up!';
  //     return snakeToCamel(v)
  //   },
  // };
  // app.useGlobalInterceptors(new SerializeInterceptor(strategy));
  await app.listen(3000);
}

bootstrap();
