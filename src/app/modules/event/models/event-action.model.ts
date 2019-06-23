import { Event } from '../models/event.model';

export class EventAction {

  readonly type: string;
  readonly payload: {
    readonly events?: Event[],
    readonly eventId?: number,
    readonly event?: Event
  };

}
