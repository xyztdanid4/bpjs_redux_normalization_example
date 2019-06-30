import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Place } from '@modules/event/models/place.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, finalize, takeUntil } from 'rxjs/operators';
import { PlaceService } from '@modules/event/services/place/place.service';
import { Subject } from 'rxjs';
import { PlaceActionsService } from '@modules/event/services/place/place-actions.service';

@Component({
  selector: 'app-event-place',
  templateUrl: './event-place.component.html',
  styleUrls: ['./event-place.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPlaceComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();

  isModalOpen: boolean;
  eventPlaceForm: FormGroup;
  place: Place;

  @Input() readonly placeId: number;
  @Input() readonly eventId: number;

  constructor(
    private formBuilder: FormBuilder,
    private placeService: PlaceService,
    private placeActionService: PlaceActionsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscribeToPlace();
    this.eventPlaceForm = this.createForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToPlace(): void {
    this.placeActionService.getPlace(this.placeId)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (place: Place) => this.place = place
      });
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      address: [null, [Validators.required]]
    });
  }

  private patchForm(): void {
    if (this.place) {
      this.eventPlaceForm.patchValue(this.place);
    }
  }

  openModal(): void {
    this.patchForm();
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.cdr.detectChanges();
  }

  updatePlace(): void {
    if (!this.eventPlaceForm.valid) {
      return;
    }

    this.placeService.updatePlace({ id: this.place.id, ...this.eventPlaceForm.value }, this.eventId)
      .pipe(
        take(1),
        finalize(() => this.closeModal())
      )
      .subscribe();
  }

  deletePlace(): void {
    this.placeService.deletePlace(this.place.id, this.eventId)
      .pipe(
        take(1)
      )
      .subscribe();
  }

}
