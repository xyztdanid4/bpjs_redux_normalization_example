import { Pricing } from './pricing.model';

export class PricingAction {

  readonly type: string;
  readonly payload: {
    readonly pricingId?: number,
    readonly pricing?: Pricing,
    readonly eventId?: number
  };

}
