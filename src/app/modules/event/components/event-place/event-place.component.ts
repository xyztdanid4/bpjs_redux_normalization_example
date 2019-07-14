import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
import { Place } from '@modules/event/models/place.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, finalize, takeUntil } from 'rxjs/operators';
import { PlaceService } from '@modules/event/services/place/place.service';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-event-place',
  templateUrl: './event-place.component.html',
  styleUrls: ['./event-place.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPlaceComponent implements OnInit, OnDestroy, OnChanges {

  private readonly destroy$ = new Subject<void>();

  isModalOpen: boolean;
  eventPlaceForm: FormGroup;
  place: Place;

  @Input() readonly eventPlace$: Observable<Place>;

  constructor(
    private formBuilder: FormBuilder,
    private placeService: PlaceService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscribeToPlace();
    this.eventPlaceForm = this.createForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGED', 'EVENT-PLACE', changes);
  }

  get runChangeDetection() {
    console.log('EVENT-PLACE - Checking the view');
    return true;
  }

  private subscribeToPlace(): void {
    this.eventPlace$.pipe(
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
    this.changeDetectorRef.detectChanges();
  }

  updatePlace(): void {
    if (!this.eventPlaceForm.valid) {
      return;
    }

    this.placeService.updatePlace({ id: this.place.id, ...this.eventPlaceForm.value })
      .pipe(
        take(1),
        finalize(() => this.closeModal())
      )
      .subscribe();
  }

  deletePlace(): void {
    this.placeService.deletePlace(this.place.id, this.place.eventId)
      .pipe(
        take(1)
      )
      .subscribe();
  }

}
