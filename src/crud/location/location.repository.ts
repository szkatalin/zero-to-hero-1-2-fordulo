import { EntityRepository, Repository } from 'typeorm';
import { Location } from './model/location.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
  async getLocationById(id: number) {
    const location = await this.findOne({ where: { id } });
    if (location) return location;
    throw new NotFoundException(`Location with ID "${id}" not found!`);
  }

  async createLocation(createLocationDto: CreateLocationDto) {
    let location = new Location();

    location.name = createLocationDto.name;
    location.address = createLocationDto.address;

    return location.save();
  }

  async updateLocation(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.getLocationById(id);

    if (updateLocationDto.name) {
      location.name = updateLocationDto.name;
    }

    if (updateLocationDto.address) {
      location.address = updateLocationDto.address;
    }

    return location.save();
  }

  async deleteLocation(id: number) {
    const location = await this.getLocationById(id);
    return location.remove();
  }
}
