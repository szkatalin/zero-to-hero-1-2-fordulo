import { Module } from '@nestjs/common';
import { LocationModule } from './location/location.module';
import { EquipmentModule } from './equipment/equipment.module';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      migrationsRun: true,
      ssl: { rejectUnauthorized: false }
    }),
    LocationModule,
    EquipmentModule,
    EmployeeModule
  ],
  controllers: [],
  providers: []
})
export class CrudModule {}
