import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as bodyParser from 'body-parser';
// import { BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(
  //   bodyParser.json({
  //     type: (req: any) => {
  //       if (req.get('Content-Type') === 'application/json') {
  //         return req.get('Content-Type') === 'application/json';
  //       }
  //       throw new BadRequestException();
  //     },
  //     strict: false
  //   })
  // );

  const port = process.env.PORT || '3000';
  await app.listen(port);
}
bootstrap();
