import { EventActionsService } from '@modules/event/services/event/event-actions.service';
import { EventAction } from '@modules/event/models/event-action.model';

function defaultState(): number[] {
  return null;
}

export function EventListReducer(state = defaultState(), action: EventAction | any): number[] {
  switch (action.type) {
    case EventActionsService.STORE_EVENTS:
      return [...action.payload.events];
    case EventActionsService.DELETE_EVENT:
      return state.filter((eventId: number) => eventId !== action.payload.id);
    default:
      return state;
  }
}
