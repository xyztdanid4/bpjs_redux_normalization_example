import { Injectable } from '@angular/core';
import { dispatch, NgRedux } from '@angular-redux/store';
import { PlaceAction } from '../../models/place-action.model';
import { Place } from '../../models/place.model';
import { IAppState } from '@core/reducers/root.reducer';
import { Observable } from 'rxjs';

@Injectable()
export class PlaceActionsService {

  static readonly CREATE_PLACE: string = 'PLACE_CREATE_PLACE';
  static readonly UPDATE_PLACE: string = 'PLACE_UPDATE_PLACE';
  static readonly DELETE_PLACE: string = 'PLACE_DELETE_PLACE';

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  @dispatch()
  createPlaceDispatch(place: Place): PlaceAction {
    return {
      type: PlaceActionsService.CREATE_PLACE,
      payload: {
        place
      }
    };
  }

  @dispatch()
  updatePlaceDispatch(place: Place, eventId: number): PlaceAction {
    return {
      type: PlaceActionsService.UPDATE_PLACE,
      payload: {
        eventId,
        place
      }
    };
  }

  @dispatch()
  deletePlaceDispatch(placeId: number, eventId: number): PlaceAction {
    return {
      type: PlaceActionsService.DELETE_PLACE,
      payload: {
        eventId,
        placeId
      }
    };
  }

  getPlace(placeId: number): Observable<Place> {
    return this.ngRedux.select(['place', `${placeId}`]);
  }

}
