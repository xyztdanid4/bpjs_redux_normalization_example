import { Place } from './place.model';

export class PlaceAction {

  readonly type: string;
  readonly payload: {
    readonly eventId?: number,
    readonly placeId?: number,
    readonly place?: Place
  };

}
