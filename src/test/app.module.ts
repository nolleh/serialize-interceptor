import { Module } from '@nestjs/common';
import { AppController } from 'test/app.controller';

@Module({
  controllers: [AppController],
})
export class AppModule {}

