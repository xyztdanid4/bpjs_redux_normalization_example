import { Injectable } from '@angular/core';
import { IPlaceSource } from '../../interfaces/place-source.interface';
import { Place } from '../../models/place.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class PlaceSourceService implements IPlaceSource {

  updatePlace(place: Place): Observable<Response> {
    return of(new Response())
      .pipe(
        delay(500)
      );
  }

  deletePlace(placeId: number): Observable<Response> {
    return of(new Response())
      .pipe(
        delay(500)
      );
  }

  createPlace(place: Place): Observable<Response> {
    return of(new Response())
      .pipe(
        delay(500)
      );
  }

}
