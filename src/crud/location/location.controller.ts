import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from '../model/location.entity';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Post()
  public createLocation(@Body() location: Location) {
    return this.locationService.createLocation();
  }

  @Put(':id')
  public updateLocation(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.updateLocation();
  }

  @Delete(':id')
  public deleteLocation(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.deleteLocation(id);
  }
}
