import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { take, finalize, takeUntil } from 'rxjs/operators';
import { Callout } from '@shared/models/callout/callout.model';
import { CalloutType } from '@shared/enums/callout-type.enum';
import { EventService } from '@modules/event/services/event/event.service';
import { EventListItem } from '@modules/event/models/event-list-item.model';
import { EventActionsService } from '@modules/event/services/event/event-actions.service';
import { Subject } from 'rxjs';
import { deleteAnimation } from '@shared/animations/delete.animation';
import { calloutRevealAnimation } from '@shared/animations/callout-reveal.animation';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss'],
  animations: [deleteAnimation, calloutRevealAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListItemComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();

  readonly emptyPlaceCallout: Callout = {
    title: 'Empty event place',
    description: '',
    type: CalloutType.ERROR
  };

  readonly emptyPricingCallout: Callout = {
    title: 'Empty event pricings',
    description: '',
    type: CalloutType.ERROR
  };

  isModalOpen: boolean;
  eventListItemForm: FormGroup;
  eventListItem: EventListItem;

  @Input() readonly eventId: number;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private eventActionsService: EventActionsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscribeToEvent();
    this.eventListItemForm = this.createForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToEvent(): void {
    this.eventActionsService.getEvent(this.eventId)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (eventListItem: EventListItem) => {
          this.eventListItem = eventListItem;
          this.cdr.markForCheck();
        }
      });
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  private patchForm(): void {
    this.eventListItemForm.patchValue({ name: this.eventListItem.name });
  }

  openModal(): void {
    this.patchForm();
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.cdr.detectChanges();
  }

  updateEvent(): void {
    if (!this.eventListItemForm.valid) {
      return;
    }

    this.eventService.updateEvent({
      ...this.eventListItem,
      ...this.eventListItemForm.value
    })
      .pipe(
        take(1),
        finalize(() => this.closeModal())
      )
      .subscribe();
  }

  deleteEvent(): void {
    this.eventService.deleteEvent(this.eventListItem)
      .pipe(
        take(1)
      )
      .subscribe();
  }

  trackByFn(index: number, item: number): number {
    return item;
  }

}
