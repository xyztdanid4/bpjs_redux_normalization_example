import { Observable } from 'rxjs';
import { Place } from '../models/place.model';

export abstract class IPlaceSource {
  abstract createPlace(place: Place): Observable<Response>;
  abstract updatePlace(place: Place): Observable<Response>;
  abstract deletePlace(placeId: number): Observable<Response>;

}
