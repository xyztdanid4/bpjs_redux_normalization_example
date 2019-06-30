import { Injectable } from '@angular/core';
import { dispatch, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { IAppState } from '@core/reducers/root.reducer';
import { EventAction } from '@modules/event/models/event-action.model';
import { Event } from '../../models/event.model';

@Injectable()
export class EventActionsService {

  static readonly STORE_EVENTS: string = 'EVENT_STORE_EVENTS';
  static readonly DELETE_EVENT: string = 'EVENT_DELETE_EVENT';
  static readonly UPDATE_EVENT: string = 'EVENT_UPDATE_EVENT';

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  @dispatch()
  storeEventsDispatch(events: Event[]): EventAction {
    return {
      type: EventActionsService.STORE_EVENTS,
      payload: {
        events
      }
    };
  }

  @dispatch()
  updateEventDispatch(event: Event): EventAction {
    return {
      type: EventActionsService.UPDATE_EVENT,
      payload: {
        event
      }
    };
  }

  @dispatch()
  deleteEventDispatch(eventId: number): EventAction {
    return {
      type: EventActionsService.DELETE_EVENT,
      payload: {
        eventId
      }
    };
  }

  getEvents(): Observable<Event[]> {
    return this.ngRedux.select(['events']);
  }

}
