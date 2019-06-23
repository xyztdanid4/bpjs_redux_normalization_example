import { Component, OnInit, Input } from '@angular/core';
import { Pricing } from '@modules/event/models/pricing.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-pricing',
  templateUrl: './event-pricing.component.html',
  styleUrls: ['./event-pricing.component.scss']
})
export class EventPricingComponent implements OnInit {

  isModalOpen: boolean;
  eventPricingForm: FormGroup;

  @Input() readonly pricing: Pricing;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.eventPricingForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]]
    });
  }

  private patchForm(): void {
    this.eventPricingForm.patchValue(this.pricing);
  }

  openModal(): void {
    this.patchForm();
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  updatePricing(): void {
    alert('method not implemented');
  }

}
