import { IPricing } from '../interfaces/pricing.interface';

export class Pricing implements IPricing {

  readonly id?: number;
  readonly name: string;
  readonly price: number;
  readonly eventId?: number;

  constructor(iPricing: IPricing) {
    this.id = iPricing.id;
    this.name = iPricing.name;
    this.price = iPricing.price;
    this.eventId = iPricing.eventId;
  }

}
