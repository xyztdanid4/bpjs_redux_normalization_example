import { Injectable } from '@angular/core';
import { dispatch, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { IAppState } from '@core/reducers/root.reducer';
import { EventAction } from '@modules/event/models/event-action.model';
import { EventNormalizedAggregated } from '@modules/event/models/event-normalized-aggregated.model';
import { EventListItem } from '@modules/event/models/event-list-item.model';
@Injectable()
export class EventActionsService {

  static readonly STORE_EVENTS: string = 'EVENT_STORE_EVENTS';
  static readonly DELETE_EVENT: string = 'EVENT_DELETE_EVENT';
  static readonly UPDATE_EVENT: string = 'EVENT_UPDATE_EVENT';

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  @dispatch()
  storeEventsDispatch(events: EventNormalizedAggregated): EventAction {
    return {
      type: EventActionsService.STORE_EVENTS,
      payload: events
    };
  }

  @dispatch()
  updateEventDispatch(event: EventListItem): EventAction {
    return {
      type: EventActionsService.UPDATE_EVENT,
      payload: event
    };
  }

  @dispatch()
  deleteEventDispatch(event: EventListItem): EventAction {
    return {
      type: EventActionsService.DELETE_EVENT,
      payload: event
    };
  }

  getEventList(): Observable<number[]> {
    return this.ngRedux.select(['eventList']);
  }

  getEvent(eventId: number): Observable<EventListItem> {
    return this.ngRedux.select(['eventListItem', `${eventId}`]);
  }

}
