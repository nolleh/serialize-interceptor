// test app
import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SerializeInterceptor } from "serialize-interceptor";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
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
  app.useGlobalInterceptors(new SerializeInterceptor());
  await app.listen(3000);
}

bootstrap();
