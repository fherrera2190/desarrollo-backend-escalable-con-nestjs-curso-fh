import { Injectable } from '@nestjs/common';
import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';
import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService,
  ) {}

  pupulateDB() {
    //CARS_SEED;
    //BRANDS_SEED;
    this.carsService.fillCarsWithSeedData(CARS_SEED);
    this.brandsService.fillBrandsWithSeedData(BRANDS_SEED);
    return 'Seeding executed successfully';
  }
}
