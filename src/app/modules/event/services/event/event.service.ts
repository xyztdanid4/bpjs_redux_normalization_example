import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { EventActionsService } from './event-actions.service';
import { IEventSource } from '@modules/event/interfaces/event.source.interface';
import { normalize, NormalizedSchema } from 'normalizr';
import { eventListSchema } from '@modules/event/schemas/event.schema';
import { IEvent } from '@modules/event/interfaces/event.interface';
import { Event } from '@modules/event/models/event.model';
import { EventNormalized } from '@modules/event/models/event-normalized.model';
import { EventNormalizedAggregated } from '@modules/event/models/event-normalized-aggregated.model';
import { EventListItem } from '@modules/event/models/event-list-item.model';
import { EventAction } from '@modules/event/models/event-action.model';

@Injectable()
export class EventService {

  constructor(
    private eventSourceService: IEventSource,
    private eventActionsService: EventActionsService
  ) { }

  getEvents(): Observable<EventNormalizedAggregated> {
    return this.eventSourceService.getEvents()
      .pipe(
        take(1),
        map((iEvents: IEvent[]) => iEvents.map((iEvent: IEvent) => new Event(iEvent))),
        map((events: Event[]) => {
          const normalizedEvents: NormalizedSchema<EventNormalized, number[]> = normalize(events, eventListSchema);
          return {
            ...normalizedEvents.entities,
            events: normalizedEvents.result
          };
        }),
        tap((events: EventNormalizedAggregated) => this.eventActionsService.storeEventsDispatch(events))
      );
  }

  updateEvent(event: EventListItem): Observable<Response> {
    return this.eventSourceService.updateEvent(event)
      .pipe(
        take(1),
        tap(() => this.eventActionsService.updateEventDispatch(event))
      );
  }

  deleteEvent(event: EventListItem): Observable<Response> {
    return this.eventSourceService.deleteEvent(event.id)
      .pipe(
        take(1),
        tap(() => this.eventActionsService.deleteEventDispatch(event))
      );
  }
}
