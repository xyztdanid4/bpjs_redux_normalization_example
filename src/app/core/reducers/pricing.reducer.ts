import { NormalizedCollection } from '@core/models/normalized-collection.model';
import { Pricing } from '@modules/event/models/pricing.model';
import { EventActionsService } from '@modules/event/services/event/event-actions.service';
import { EventAction } from '@modules/event/models/event-action.model';
import { PricingAction } from '@modules/event/models/pricing-action.model';
import { PricingActionsService } from '@modules/event/services/pricing/pricing-actions.service';

function defaultState(): NormalizedCollection<Pricing> {
  return null;
}

export function PricingReducer(state = defaultState(), action: EventAction | PricingAction | any): NormalizedCollection<Pricing> {
  switch (action.type) {
    case EventActionsService.STORE_EVENTS:
      return {
        ...action.payload.pricing
      };
    case EventActionsService.DELETE_EVENT:
      return Object.keys(state)
        .filter((key: string) => action.payload.pricings.includes(String(key)))
        .reduce((result, current) => {
          result[current] = state[current];
          return result;
        }, {});
    case PricingActionsService.UPDATE_PRICING:
      return {
        ...state,
        [action.payload.pricing.id]: {
          ...state[action.payload.pricing.id],
          ...action.payload.pricing
        }
      };
    case PricingActionsService.DELETE_PRICING:
      return Object.keys(state)
        .filter((key: string) => key !== String(action.payload.pricingId))
        .reduce((result, current) => {
          result[current] = state[current];
          return result;
        }, {});
    default:
      return state;
  }
}
