import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { PlaceAction } from '../../models/place-action.model';
import { Place } from '../../models/place.model';

@Injectable()
export class PlaceActionsService {

  static readonly CREATE_PLACE: string = 'PLACE_CREATE_PLACE';
  static readonly UPDATE_PLACE: string = 'PLACE_UPDATE_PLACE';
  static readonly DELETE_PLACE: string = 'PLACE_DELETE_PLACE';

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
  updatePlaceDispatch(place: Place): PlaceAction {
    return {
      type: PlaceActionsService.UPDATE_PLACE,
      payload: {
        place
      }
    };
  }

  @dispatch()
  deletePlaceDispatch(placeId: number): PlaceAction {
    return {
      type: PlaceActionsService.DELETE_PLACE,
      payload: {
        placeId
      }
    };
  }

}
