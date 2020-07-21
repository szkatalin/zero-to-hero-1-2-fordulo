import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { CrudModule } from "./crud/crud.module";
import { HttpStatusService } from './http-status/http-status.service';
import { HttpStatusModule } from './http-status/http-status.module';
import { SquaresModule } from './squares/squares.module';

@Module({
  imports: [CrudModule, HttpStatusModule, SquaresModule],
  controllers: [AppController],
  providers: [HttpStatusService]
})
export class AppModule {}
