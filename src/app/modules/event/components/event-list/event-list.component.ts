import { Component, OnInit, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { take, finalize, takeUntil } from 'rxjs/operators';
import { Event } from '../../models/event.model';
import { Subject } from 'rxjs';
import { Callout } from '@shared/models/callout/callout.model';
import { CalloutType } from '@shared/enums/callout-type.enum';
import { EventService } from '@modules/event/services/event/event.service';
import { EventActionsService } from '@modules/event/services/event/event-actions.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy, OnChanges {

  private readonly destroy$ = new Subject<void>();

  readonly emptyEventsCallout: Callout = {
    title: 'Empty events',
    description: '',
    type: CalloutType.ERROR
  };

  isError: boolean;
  isLoading: boolean;
  events: Event[];

  constructor(
    private eventService: EventService,
    private eventActionsService: EventActionsService
  ) { }

  ngOnInit(): void {
    this.fetchEvents();
    this.subscribeToEvents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGED', 'EVENT-LIST', changes);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGED', 'EVENT-LIST', changes);
  }

  get runChangeDetection() {
    console.log('EVENT-LIST - Checking the view');
    return true;
  }

  private fetchEvents(): void {
    this.isLoading = true;
    this.eventService.getEvents()
      .pipe(
        take(1),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        error: () => this.isError = true
      });
  }

  private subscribeToEvents(): void {
    this.eventActionsService.getEvents()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (events: Event[]) => this.events = events
      });
  }

  get runChangeDetection() {
    console.log('EVENT-LIST - Checking the view');
    return true;
  }

}
