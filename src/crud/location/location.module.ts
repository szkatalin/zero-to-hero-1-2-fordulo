import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './model/location.entity';
import { LocationRepository } from './location.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Location, LocationRepository])],
  controllers: [LocationController],
  providers: [LocationService]
})
export class LocationModule {}
