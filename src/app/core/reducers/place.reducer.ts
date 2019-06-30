import { NormalizedCollection } from '@core/models/normalized-collection.model';
import { Place } from '@modules/event/models/place.model';
import { EventActionsService } from '@modules/event/services/event/event-actions.service';
import { PlaceActionsService } from '@modules/event/services/place/place-actions.service';
import { PlaceAction } from '@modules/event/models/place-action.model';
import { EventAction } from '@modules/event/models/event-action.model';

function defaultState(): NormalizedCollection<Place> {
  return null;
}

export function PlaceReducer(state = defaultState(), action: EventAction | PlaceAction | any): NormalizedCollection<Place> {
  switch (action.type) {
    case EventActionsService.STORE_EVENTS:
      return {
        ...action.payload.place
      };
    case EventActionsService.DELETE_EVENT:
      return Object.keys(state)
        .filter((key: string) => key !== String(action.payload.place))
        .reduce((result, current) => {
          result[current] = state[current];
          return result;
        }, {});
    case PlaceActionsService.UPDATE_PLACE:
      return {
        ...state,
        [action.payload.place.id]: {
          ...state[action.payload.place.id],
          ...action.payload.place
        }
      };
    case PlaceActionsService.DELETE_PLACE:
      return Object.keys(state)
        .filter((key: string) => key !== String(action.payload.placeId))
        .reduce((result, current) => {
          result[current] = state[current];
          return result;
        }, {});
    default:
      return state;
  }
}
