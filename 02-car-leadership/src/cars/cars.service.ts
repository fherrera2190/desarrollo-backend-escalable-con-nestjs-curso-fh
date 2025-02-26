import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Camry',
    // }
  ];

  findAll() {
    return this.cars;
  }

  findById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }
  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(car);
    return car;
  }
  update(id: string, updateCarDto: UpdateCarDto) {
    if (updateCarDto.id && updateCarDto.id !== id) {
      throw new BadRequestException('Car id is not valid inside body');
    }
    let carDB = this.findById(id);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDto, id };
        return carDB;
      }
      return car;
    });
    return carDB;
  }
  delete(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const carDB: Car = this.findById(id);

    this.cars = this.cars.filter((car) => car.id !== id);
  }
  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
