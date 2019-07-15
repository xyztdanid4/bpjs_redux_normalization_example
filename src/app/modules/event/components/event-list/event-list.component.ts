import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { take, finalize, map, filter, takeUntil } from 'rxjs/operators';
import { Callout } from '@shared/models/callout/callout.model';
import { CalloutType } from '@shared/enums/callout-type.enum';
import { listItemRevealAnimation } from '@shared/animations/list-item-reveal.animation';
import { EventService } from '@modules/event/services/event/event.service';
import { EventActionsService } from '@modules/event/services/event/event-actions.service';
import { deleteAnimation } from '@shared/animations/delete.animation';
import { calloutRevealAnimation } from '@shared/animations/callout-reveal.animation';
import { EventListItem } from '@modules/event/models/event-list-item.model';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  animations: [listItemRevealAnimation, deleteAnimation, calloutRevealAnimation]
})
export class EventListComponent implements OnInit, OnChanges, OnDestroy {

  private readonly destroy$ = new Subject<void>();

  readonly emptyEventsCallout: Callout = {
    title: 'Empty events',
    description: '',
    type: CalloutType.ERROR
  };

  isError: boolean;
  isLoading: boolean;
  eventListItems: Observable<EventListItem>[];
  eventList: number[];

  constructor(
    private eventService: EventService,
    private eventActionsService: EventActionsService
  ) { }

  ngOnInit(): void {
    this.fetchEvents();
    this.getEventListItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGED', 'EVENT-LIST', changes);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
        next: () => this.getEventList(),
        error: () => this.isError = true
      });
  }

  getEventList(): void {
    this.eventActionsService.getEventList()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (eventList: number[]) => this.eventList = eventList
      });
  }

  getEventListItem(eventId: number): Observable<EventListItem> {
    return this.eventActionsService.getEvent(eventId);
  }

  getEventListItems(): void {
    this.eventActionsService.getEventList()
      .pipe(
        filter(asd => !!asd),
        map((eventIds: number[]) => this.eventActionsService.getEventListItems(eventIds))
      )
      .subscribe({
        next: (eventListItems: Observable<EventListItem>[]) =>
          this.eventListItems = eventListItems
      });
  }

  trackByFn(index: number, item: number): number {
    return item;
  }

}
