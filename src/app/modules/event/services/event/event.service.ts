import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { EventActionsService } from './event-actions.service';
import { IEventSource } from '@modules/event/interfaces/event.source.interface';
import { IEvent } from '@modules/event/interfaces/event.interface';
import { Event } from '../../models/event.model';

@Injectable()
export class EventService {

  constructor(
    private eventSourceService: IEventSource,
    private eventActionsService: EventActionsService
  ) { }

  getEvents(): Observable<Event[]> {
    return this.eventSourceService.getEvents()
      .pipe(
        take(1),
        map((iEvents: IEvent[]) => iEvents.map((iEvent: IEvent) => new Event(iEvent))),
        tap((events: Event[]) => this.eventActionsService.storeEventsDispatch(events))
      );
  }

  updateEvent(event: Event): Observable<Response> {
    return this.eventSourceService.updateEvent(event)
      .pipe(
        take(1),
        tap(() => this.eventActionsService.updateEventDispatch(event))
      );
  }

  deleteEvent(eventId: number): Observable<Response> {
    return this.eventSourceService.deleteEvent(eventId)
      .pipe(
        take(1),
        tap(() => this.eventActionsService.deleteEventDispatch(eventId))
      );
  }
}
