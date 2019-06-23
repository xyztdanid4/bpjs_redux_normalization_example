import { Observable } from 'rxjs';
import { Pricing } from '../models/pricing.model';

export abstract class IPricingSource {

  abstract createPricing(pricing: Pricing): Observable<Response>;
  abstract updatePricing(pricing: Pricing): Observable<Response>;
  abstract deletePricing(pricingId: number): Observable<Response>;
}
