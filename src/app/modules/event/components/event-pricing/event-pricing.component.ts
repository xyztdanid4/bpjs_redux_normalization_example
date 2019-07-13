import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Pricing } from '@modules/event/models/pricing.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PricingService } from '@modules/event/services/pricing/pricing.service';
import { take, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-event-pricing',
  templateUrl: './event-pricing.component.html',
  styleUrls: ['./event-pricing.component.scss']
})
export class EventPricingComponent implements OnInit {

  isModalOpen: boolean;
  eventPricingForm: FormGroup;

  @Input() readonly pricing: Pricing;
  @Input() readonly eventId: number;

  constructor(
    private formBuilder: FormBuilder,
    private pricingService: PricingService
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
    if (!this.eventPricingForm.valid) {
      return;
    }

    this.pricingService.updatePricing(
      this.eventId, {
        ...this.eventPricingForm.value,
        id: this.pricing.id
      })
      .pipe(
        take(1),
        finalize(() => this.closeModal())
      )
      .subscribe();
  }

  deletePricing(): void {
    this.pricingService.deletePricing(this.eventId, this.pricing.id)
      .pipe(
        take(1)
      )
      .subscribe();
  }

}
