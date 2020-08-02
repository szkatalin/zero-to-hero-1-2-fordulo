import { Injectable } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { validate } from 'class-validator';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationRepository)
    private locationRepository: LocationRepository
  ) {}

  public async createLocation(createLocationDto: CreateLocationDto) {
    return validate(createLocationDto).then(() => {
      return this.locationRepository.createLocation(createLocationDto);
    })
  }

  updateLocation(id: number, updateLocationDto: UpdateLocationDto) {
    return validate(updateLocationDto).then(() => {
      return this.locationRepository.updateLocation(id, updateLocationDto);
    })
  }

  deleteLocation(id: number) {
    return this.locationRepository.deleteLocation(id);
  }
}
