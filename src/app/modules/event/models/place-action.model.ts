import { Place } from './place.model';

export class PlaceAction {

  readonly type: string;
  readonly payload: {
    readonly placeId?: number,
    readonly place?: Place
  };

}
