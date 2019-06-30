import { Injectable } from '@angular/core';
import { IPricingSource } from '../../interfaces/pricing-source.interface';
import { Pricing } from '../../models/pricing.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class PricingSourceService implements IPricingSource {

  createPricing(pricing: Pricing): Observable<Response> {
    return of(new Response())
      .pipe(
        delay(500)
      );
  }

  updatePricing(pricing: Pricing): Observable<Response> {
    return of(new Response())
      .pipe(
        delay(500)
      );
  }

  deletePricing(pricingId: number): Observable<Response> {
    return of(new Response())
      .pipe(
        delay(500)
      );
  }
}
