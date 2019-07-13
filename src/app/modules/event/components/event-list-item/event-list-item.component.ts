import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Event } from '../../models/event.model';
import { take, finalize } from 'rxjs/operators';
import { Callout } from '@shared/models/callout/callout.model';
import { CalloutType } from '@shared/enums/callout-type.enum';
import { EventService } from '@modules/event/services/event/event.service';
// import { style, trigger, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss']
})
export class EventListItemComponent implements OnInit {

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

  @Input() readonly event: Event;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.eventListItemForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  private patchForm(): void {
    this.eventListItemForm.patchValue({ name: this.event.name });
  }

  openModal(): void {
    this.patchForm();
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  updateEvent(): void {
    if (!this.eventListItemForm.valid) {
      return;
    }

    this.eventService.updateEvent({
      id: this.event.id,
      ...this.eventListItemForm.value
    })
      .pipe(
        take(1),
        finalize(() => this.closeModal())
      )
      .subscribe();
  }

  deleteEvent(): void {
    this.eventService.deleteEvent(this.event.id)
      .pipe(
        take(1)
      )
      .subscribe();
  }

}
