import { Injectable } from '@angular/core';
import { IPlaceSource } from '../interfaces/place-source.interface';
import { Place } from '../models/place.model';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { PlaceActionsService } from './place-actions.service';

@Injectable()
export class PlaceService {

  constructor(
    private placeSourceService: IPlaceSource,
    private placeActionsService: PlaceActionsService
  ) { }

  createPlace(place: Place): Observable<Response> {
    return this.placeSourceService.createPlace(place)
      .pipe(
        take(1),
        tap(() => this.placeActionsService.createPlaceDispatch(place))
      );
  }

  updatePlace(place: Place): Observable<Response> {
    return this.placeSourceService.updatePlace(place)
      .pipe(
        take(1),
        tap(() => this.placeActionsService.updatePlaceDispatch(place))
      );
  }

  deletePlace(placeId: number): Observable<Response> {
    return this.placeSourceService.deletePlace(placeId)
      .pipe(
        take(1),
        tap(() => this.placeActionsService.deletePlaceDispatch(placeId))
      );
  }

}
