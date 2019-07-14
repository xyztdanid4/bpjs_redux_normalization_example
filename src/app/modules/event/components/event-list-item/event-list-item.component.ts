import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { take, finalize, takeUntil } from 'rxjs/operators';
import { Callout } from '@shared/models/callout/callout.model';
import { CalloutType } from '@shared/enums/callout-type.enum';
import { EventService } from '@modules/event/services/event/event.service';
import { EventListItem } from '@modules/event/models/event-list-item.model';
import { Subject, Observable } from 'rxjs';
import { deleteAnimation } from '@shared/animations/delete.animation';
import { calloutRevealAnimation } from '@shared/animations/callout-reveal.animation';
import { Place } from '@modules/event/models/place.model';
import { PricingActionsService } from '@modules/event/services/pricing/pricing-actions.service';
import { Pricing } from '@modules/event/models/pricing.model';
import { PlaceActionsService } from '@modules/event/services/place/place-actions.service';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss'],
  animations: [deleteAnimation, calloutRevealAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListItemComponent implements OnInit, OnDestroy, OnChanges {

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

  @Input() readonly eventListItem$: Observable<EventListItem>;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private changeDetectorRef: ChangeDetectorRef,
    private placeActionsService: PlaceActionsService,
    private pricingActionsService: PricingActionsService
  ) { }

  ngOnInit(): void {
    this.subscribeToEvent();
    this.eventListItemForm = this.createForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGED', 'EVENT-LiST-ITEM', changes);
  }

  get runChangeDetection() {
    console.log('EVENT-LiST-ITEM - Checking the view');
    return true;
  }

  private subscribeToEvent(): void {
    this.eventListItem$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (eventListItem: EventListItem) => {
          this.eventListItem = eventListItem;
          this.changeDetectorRef.markForCheck();
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

  getEventPlace(placeId: number): Observable<Place> {
    return this.placeActionsService.getPlace(placeId);
  }

  getEventPricing(pricingId: number): Observable<Pricing> {
    return this.pricingActionsService.getPricing(pricingId);
  }

  openModal(): void {
    this.patchForm();
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.changeDetectorRef.detectChanges();
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
