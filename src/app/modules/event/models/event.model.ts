import { IEvent } from '../interfaces/event.interface';
import { Place } from './place.model';
import { Pricing } from './pricing.model';
import { IPricing } from '../interfaces/pricing.interface';

export class Event implements IEvent {
  readonly id: number;
  readonly name: string;
  readonly place: Place;
  readonly pricings: Pricing[];

  constructor(iEvent: IEvent) {
    this.id = iEvent.id;
    this.name = iEvent.name;
    this.place = new Place(iEvent.place);
    this.pricings = iEvent.pricings.map((iPricing: IPricing) => new Pricing(iPricing));
  }
}
