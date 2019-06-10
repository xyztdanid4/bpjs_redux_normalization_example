import { IPlace } from './place.interface';
import { IPricing } from './pricing.interface';

export interface IEvent {
  id: number;
  name: string;
  place: IPlace;
  pricings: IPricing[];
}
