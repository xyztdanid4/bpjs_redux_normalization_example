import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '@modules/event/services/event.service';
import { take, finalize, takeUntil } from 'rxjs/operators';
import { Event } from '../../models/event.model';
import { EventActionsService } from '@modules/event/services/event-actions.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  // todo empty states
  // todo error handling

  private readonly destroy$ = new Subject<void>();

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

}
