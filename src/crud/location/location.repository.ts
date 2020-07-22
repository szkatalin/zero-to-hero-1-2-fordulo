import { EntityRepository, Repository } from 'typeorm';
import { Location } from './model/location.entity';
import { CreateOrUpdateLocationDto } from './dto/create-or-update-location';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
  async getLocationById(id: number) {
    const location = await this.findOne({ where: { id } });
    if (location) return location;
    throw new NotFoundException(`Location with ID "${id}" not found!`);
  }

  async createLocation(createLocationDto: CreateOrUpdateLocationDto) {
    let location = new Location();

    if (createLocationDto.name && createLocationDto.address) {
      location.name = createLocationDto.name;
      location.address = createLocationDto.address;
    } else {
      throw new BadRequestException();
    }

    return location.save();
  }

  async updateLocation(
    id: number,
    updateLocationDto: CreateOrUpdateLocationDto
  ) {
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
