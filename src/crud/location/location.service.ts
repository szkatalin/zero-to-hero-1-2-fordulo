import { Injectable } from '@nestjs/common';
import { CreateOrUpdateLocationDto } from './dto/create-or-update-location';
import { LocationRepository } from './location.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationRepository)
    private locationRepository: LocationRepository
  ) {}

  public async createLocation(createLocationDto: CreateOrUpdateLocationDto) {
    return this.locationRepository.createLocation(createLocationDto);
  }

  updateLocation(id: number, updateLocationDto: CreateOrUpdateLocationDto) {
    return this.locationRepository.updateLocation(id, updateLocationDto);
  }

  deleteLocation(id: number) {
    return this.locationRepository.deleteLocation(id);
  }
}
