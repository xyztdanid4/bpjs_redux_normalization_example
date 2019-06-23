import { Injectable } from '@angular/core';
import { IPricingSource } from '../interfaces/pricing-source.interface';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { PricingActionsService } from './pricing-actions.service';
import { Pricing } from '../models/pricing.model';

@Injectable()
export class PricingService {

  constructor(
    private pricingSourceService: IPricingSource,
    private pricingActionsService: PricingActionsService
  ) { }

  createPlace(pricing: Pricing): Observable<Response> {
    return this.pricingSourceService.createPricing(pricing)
      .pipe(
        take(1),
        tap(() => this.pricingActionsService.createPricingDispatch(pricing))
      );
  }

  updatePlace(pricing: Pricing): Observable<Response> {
    return this.pricingSourceService.updatePricing(pricing)
      .pipe(
        take(1),
        tap(() => this.pricingActionsService.updatePricingDispatch(pricing))
      );
  }

  deletePlace(pricingId: number): Observable<Response> {
    return this.pricingSourceService.deletePricing(pricingId)
      .pipe(
        take(1),
        tap(() => this.pricingActionsService.deletePricingDispatch(pricingId))
      );
  }

}
