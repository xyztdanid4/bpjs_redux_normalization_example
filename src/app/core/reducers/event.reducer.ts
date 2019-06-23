import { EventAction } from '@modules/event/models/event-action.model';
import { EventActionsService } from '@modules/event/services/event-actions.service';
import { Event } from '../../modules/event/models/event.model';
import { PlaceActionsService } from '@modules/event/services/place-actions.service';
import { PlaceAction } from '@modules/event/models/place-action.model';

function defaultState(): Event[] {
  return null;
}

export function EventReducer(state = defaultState(), action: EventAction | PlaceAction | any): Event[] {
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
        if (action.payload.event.id === event.id) {
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
    default:
      return state;
  }
}
