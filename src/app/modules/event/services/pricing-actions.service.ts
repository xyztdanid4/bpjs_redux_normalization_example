import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { Pricing } from '../models/pricing.model';
import { PricingAction } from '../models/pricing-action.model';

@Injectable()
export class PricingActionsService {

  static readonly CREATE_PRICING: string = 'PRICING_CREATE_PRICING';
  static readonly UPDATE_PRICING: string = 'PRICING_UPDATE_PRICING';
  static readonly DELETE_PRICING: string = 'PRICING_DELETE_PRICING';

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
  deletePricingDispatch(pricingId: number): PricingAction {
    return {
      type: PricingActionsService.DELETE_PRICING,
      payload: {
        pricingId
      }
    };
  }
}
