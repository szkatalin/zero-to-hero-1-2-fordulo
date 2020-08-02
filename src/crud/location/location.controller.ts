import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put, ValidationPipe
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('api/location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Post()
  public createLocation(
    @Body(ValidationPipe)
    createLocationDto: CreateLocationDto
  ) {
    return this.locationService.createLocation(createLocationDto);
  }

  @Put(':id')
  public updateLocation(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateLocationDto: UpdateLocationDto
  ) {
    return this.locationService.updateLocation(id, updateLocationDto);
  }

  @Delete(':id')
  public deleteLocation(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.deleteLocation(id);
  }
}
