import { Injectable } from '@angular/core';
import { IEventSource } from '../interfaces/event.source.interface';
import { Observable, of } from 'rxjs';
import { IEvent } from '../interfaces/event.interface';
import { EVENT_MOCK } from '../mocks/event.mock';
import { delay } from 'rxjs/operators';
import { Event } from '../models/event.model';

@Injectable()
export class EventSourceService implements IEventSource {

  getEvents(): Observable<IEvent[]> {
    return of(EVENT_MOCK)
      .pipe(
        delay(500)
      );
  }

  updateEvent(event: Event): Observable<Response> {
    return of(new Response())
      .pipe(
        delay(500)
      );
  }

  deleteEvent(eventId: number): Observable<Response> {
    return of(new Response())
      .pipe(
        delay(500)
      );
  }

}
