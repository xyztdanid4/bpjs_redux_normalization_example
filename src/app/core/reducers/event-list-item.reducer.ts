import { NormalizedCollection } from '@core/models/normalized-collection.model';
import { EventListItem } from '@modules/event/models/event-list-item.model';
import { EventAction } from '@modules/event/models/event-action.model';
import { EventActionsService } from '@modules/event/services/event/event-actions.service';
import { PlaceActionsService } from '@modules/event/services/place/place-actions.service';
import { PlaceAction } from '@modules/event/models/place-action.model';
import { PricingActionsService } from '@modules/event/services/pricing/pricing-actions.service';
import { PricingAction } from '@modules/event/models/pricing-action.model';

function defaultState(): NormalizedCollection<EventListItem> {
  return null;
}

// tslint:disable-next-line:max-line-length
export function EventListItemReducer(state = defaultState(), action: EventAction | PlaceAction | PricingAction | any): NormalizedCollection<EventListItem> {
  switch (action.type) {
    case EventActionsService.STORE_EVENTS:
      return {
        ...action.payload.eventListItem
      };
    case EventActionsService.UPDATE_EVENT:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload
        }
      };
    case EventActionsService.DELETE_EVENT:
      return Object.keys(state)
        .filter((key: string) => key !== String(action.payload.id))
        .reduce((result, current) => {
          result[current] = state[current];
          return result;
        }, {});
    case PlaceActionsService.DELETE_PLACE:
      return {
        ...state,
        [action.payload.eventId]: {
          ...state[action.payload.eventId],
          place: null
        }
      };
    case PricingActionsService.DELETE_PRICING:
      return {
        ...state,
        [action.payload.eventId]: {
          ...state[action.payload.eventId],
          pricings: state[action.payload.eventId].pricings.filter((pricingId: number) => action.payload.pricingId !== pricingId)
        }
      };
    default:
      return state;
  }
}
