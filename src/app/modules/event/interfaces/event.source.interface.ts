import { Observable } from 'rxjs';
import { IEvent } from './event.interface';
import { EventListItem } from '../models/event-list-item.model';

export abstract class IEventSource {
  abstract getEvents(): Observable<IEvent[]>;
  abstract updateEvent(event: EventListItem): Observable<Response>;
  abstract deleteEvent(eventId: number): Observable<Response>;
}
