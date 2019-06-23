import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Event } from '../../models/event.model';
import { EventService } from '@modules/event/services/event.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss']
})
export class EventListItemComponent implements OnInit {

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
    this.eventService.updateEvent({
      id: this.event.id,
      ...this.eventListItemForm.value
    })
      .pipe(
        take(1)
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
