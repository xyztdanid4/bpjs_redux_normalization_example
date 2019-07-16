import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Place } from '@modules/event/models/place.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, finalize } from 'rxjs/operators';
import { PlaceService } from '@modules/event/services/place/place.service';

@Component({
  selector: 'app-event-place',
  templateUrl: './event-place.component.html',
  styleUrls: ['./event-place.component.scss']
})
export class EventPlaceComponent implements OnInit, OnChanges {

  isModalOpen: boolean;
  eventPlaceForm: FormGroup;

  @Input() readonly place: Place;

  constructor(
    private formBuilder: FormBuilder,
    private placeService: PlaceService
  ) { }

  ngOnInit(): void {
    this.eventPlaceForm = this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGED', 'EVENT-PLACE', changes);
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
  }

  updatePlace(): void {
    if (!this.eventPlaceForm.valid) {
      return;
    }

    this.placeService.updatePlace({
      id: this.place.id,
      ...this.eventPlaceForm.value
    })
      .pipe(
        take(1),
        finalize(() => this.closeModal())
      )
      .subscribe();
  }

  deletePlace(): void {
    this.placeService.deletePlace(this.place.id)
      .pipe(
        take(1)
      )
      .subscribe();
  }

  get runChangeDetection() {
    console.log('EVENT-PLACE - Checking the view');
    return true;
  }

}
