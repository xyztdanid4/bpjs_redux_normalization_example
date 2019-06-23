import { EventAction } from '@modules/event/models/event-action.model';
import { EventActionsService } from '@modules/event/services/event-actions.service';
import { Event } from '../../modules/event/models/event.model';
import { PlaceActionsService } from '@modules/event/services/place-actions.service';
import { PlaceAction } from '@modules/event/models/place-action.model';
import { PricingActionsService } from '@modules/event/services/pricing-actions.service';
import { PricingAction } from '@modules/event/models/pricing-action.model';
import { Pricing } from '@modules/event/models/pricing.model';

function defaultState(): Event[] {
  return null;
}

export function EventReducer(state = defaultState(), action: EventAction | PlaceAction | PricingAction | any): Event[] {
  switch (action.type) {

    // FIRST LOAD STORE
    case EventActionsService.STORE_EVENTS:
      return [
        ...action.payload.events
      ];

    // UPDATE EVENT
    case EventActionsService.UPDATE_EVENT:
      return state.map((event: Event) => {
        if (action.payload.event.id === event.id) {
          return {
            ...action.payload.event,
            place: {
              ...event.place
            },
            pricings: [
              ...event.pricings
            ]
          };
        } else {
          return { ...event };
        }
      });

    // DELETE EVENT
    case EventActionsService.DELETE_EVENT:
      return state.filter((event: Event) => event.id !== action.payload.eventId);

    // UPDATE EVENT PLACE
    case PlaceActionsService.UPDATE_PLACE:
      return state.map((event: Event) => {
        if (action.payload.place.id === event.place.id) {
          return {
            ...event,
            place: {
              ...action.payload.place
            },
            pricings: [
              ...event.pricings
            ]
          };
        } else {
          return { ...event };
        }
      });

    // DELETE EVENT PLACE
    case PlaceActionsService.DELETE_PLACE:
      return state.map((event: Event) => {
        if (action.payload.placeId === event.place.id) {
          return {
            ...event,
            place: null,
            pricings: [
              ...event.pricings
            ]
          };
        } else {
          return { ...event };
        }
      });

    case PricingActionsService.UPDATE_PRICING:
      return state.map((event: Event) => {
        if (action.payload.eventId === event.id) {
          return {
            ...event,
            place: { ...event.place },
            pricings: event.pricings.map((pricing: Pricing) => {
              if (pricing.id === action.payload.pricing.id) {
                return {
                  ...pricing,
                  ...action.payload.pricing
                };
              } else {
                return { ...pricing };
              }
            })
          };
        } else {
          return { ...event };
        }
      });

    case PricingActionsService.DELETE_PRICING:
      return state.map((event: Event) => {
        if (action.payload.eventId === event.id) {
          return {
            ...event,
            place: event.place ? { ...event.place } : null,
            pricings: event.pricings.filter((pricing: Pricing) => pricing.id !== action.payload.pricingId)
          };
        } else {
          return { ...event };
        }
      });

    default:
      return state;
  }
}
