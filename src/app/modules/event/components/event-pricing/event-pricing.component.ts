import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Pricing } from '@modules/event/models/pricing.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PricingService } from '@modules/event/services/pricing/pricing.service';
import { take, finalize, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-pricing',
  templateUrl: './event-pricing.component.html',
  styleUrls: ['./event-pricing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPricingComponent implements OnInit, OnChanges {

  isModalOpen: boolean;
  eventPricingForm: FormGroup;

  @Input() readonly eventPricing$: Observable<Pricing>;

  constructor(
    private formBuilder: FormBuilder,
    private pricingService: PricingService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.eventPricingForm = this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGED', 'EVENT-PRICING', changes);
  }

  get runChangeDetection() {
    console.log('EVENT-PRICING - Checking the view');
    return true;
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]]
    });
  }

  private patchForm(): void {
    this.eventPricing$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (pricing: Pricing) => this.eventPricingForm.patchValue(pricing)
      });
  }

  openModal(): void {
    this.patchForm();
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.changeDetectorRef.markForCheck();
  }

  updatePricing(): void {
    if (!this.eventPricingForm.valid) {
      return;
    }

    this.eventPricing$
      .pipe(
        take(1),
        switchMap((pricing: Pricing) => this.pricingService.updatePricing({ ...pricing, ...this.eventPricingForm.value })),
        finalize(() => this.closeModal())
      )
      .subscribe();
  }

  deletePricing(): void {
    this.eventPricing$
      .pipe(
        take(1),
        switchMap((pricing: Pricing) => this.pricingService.deletePricing(pricing.eventId, pricing.id))
      )
      .subscribe();
  }

}
