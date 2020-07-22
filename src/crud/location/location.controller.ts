import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateOrUpdateLocationDto } from './dto/create-or-update-location';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Post()
  public createLocation(
    @Body()
    createOrUpdateLocationDto: CreateOrUpdateLocationDto
  ) {
    return this.locationService.createLocation(createOrUpdateLocationDto);
  }

  @Put(':id')
  public updateLocation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLocationDto: CreateOrUpdateLocationDto
  ) {
    return this.locationService.updateLocation(id, updateLocationDto);
  }

  @Delete(':id')
  public deleteLocation(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.deleteLocation(id);
  }
}
