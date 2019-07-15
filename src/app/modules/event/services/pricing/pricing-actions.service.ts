import { Injectable } from '@angular/core';
import { dispatch, NgRedux } from '@angular-redux/store';
import { Pricing } from '../../models/pricing.model';
import { PricingAction } from '../../models/pricing-action.model';
import { IAppState } from '@core/reducers/root.reducer';
import { Observable } from 'rxjs';
import { NormalizedCollection } from '@core/models/normalized-collection.model';
import { map } from 'rxjs/operators';

@Injectable()
export class PricingActionsService {

  static readonly CREATE_PRICING: string = 'PRICING_CREATE_PRICING';
  static readonly UPDATE_PRICING: string = 'PRICING_UPDATE_PRICING';
  static readonly DELETE_PRICING: string = 'PRICING_DELETE_PRICING';

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  @dispatch()
  createPricingDispatch(pricing: Pricing): PricingAction {
    return {
      type: PricingActionsService.CREATE_PRICING,
      payload: {
        pricing
      }
    };
  }

  @dispatch()
  updatePricingDispatch(pricing: Pricing): PricingAction {
    return {
      type: PricingActionsService.UPDATE_PRICING,
      payload: {
        pricing
      }
    };
  }

  @dispatch()
  deletePricingDispatch(eventId: number, pricingId: number): PricingAction {
    return {
      type: PricingActionsService.DELETE_PRICING,
      payload: {
        eventId,
        pricingId
      }
    };
  }

  getPricings(eventId: number): Observable<Pricing[]> {
    return this.ngRedux.select(['pricing'])
      .pipe(
        map((normalizedPricing: NormalizedCollection<Pricing>) => {
          const filteredPricings = [];
          for (const key in normalizedPricing) {
            if (normalizedPricing[key].eventId === eventId) {
              filteredPricings.push(normalizedPricing[key]);
            }
          }
          return filteredPricings;
        })
      );
  }

}
