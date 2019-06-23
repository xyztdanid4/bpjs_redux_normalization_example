import { Observable } from 'rxjs';
import { IEvent } from './event.interface';
import { Event } from '../models/event.model';

export abstract class IEventSource {
  abstract getEvents(): Observable<IEvent[]>;
  abstract updateEvent(event: Event): Observable<Response>;
  abstract deleteEvent(eventId: number): Observable<Response>;
}
