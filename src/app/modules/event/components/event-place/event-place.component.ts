import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
import { Place } from '@modules/event/models/place.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, finalize, map, switchMap } from 'rxjs/operators';
import { PlaceService } from '@modules/event/services/place/place.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-place',
  templateUrl: './event-place.component.html',
  styleUrls: ['./event-place.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPlaceComponent implements OnInit, OnChanges {

  isModalOpen: boolean;
  eventPlaceForm: FormGroup;

  @Input() readonly eventPlace$: Observable<Place>;

  constructor(
    private formBuilder: FormBuilder,
    private placeService: PlaceService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.eventPlaceForm = this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGED', 'EVENT-PLACE', changes);
  }

  get runChangeDetection() {
    console.log('EVENT-PLACE - Checking the view');
    return true;
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      address: [null, [Validators.required]]
    });
  }

  private patchForm(): void {
    this.eventPlace$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (place: Place) => this.eventPlaceForm.patchValue(place)
      });
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

    this.eventPlace$
      .pipe(
        take(1),
        switchMap((place: Place) => this.placeService.updatePlace({ ...place, ...this.eventPlaceForm.value })),
        finalize(() => this.closeModal())
      )
      .subscribe();
  }

  deletePlace(): void {
    this.eventPlace$
      .pipe(
        take(1),
        switchMap((place: Place) => this.placeService.deletePlace(place.id, place.eventId))
      )
      .subscribe();
  }

}
