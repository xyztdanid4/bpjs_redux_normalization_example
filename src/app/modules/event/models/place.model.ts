import { IPlace } from '../interfaces/place.interface';

export class Place implements IPlace {
  readonly id: number;
  readonly name: string;
  readonly address: string;

  constructor(iPlace: IPlace) {
    this.id = iPlace.id;
    this.name = iPlace.name;
    this.address = iPlace.address;
  }
}
