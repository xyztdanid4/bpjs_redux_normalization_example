import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Pricing } from '@modules/event/models/pricing.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PricingService } from '@modules/event/services/pricing/pricing.service';
import { take, finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PricingActionsService } from '@modules/event/services/pricing/pricing-actions.service';

@Component({
  selector: 'app-event-pricing',
  templateUrl: './event-pricing.component.html',
  styleUrls: ['./event-pricing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPricingComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();

  isModalOpen: boolean;
  eventPricingForm: FormGroup;
  pricing: Pricing;

  @Input() readonly pricingId: number;
  @Input() readonly eventId: number;

  constructor(
    private formBuilder: FormBuilder,
    private pricingService: PricingService,
    private pricingActionsService: PricingActionsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscribeToPricing();
    this.eventPricingForm = this.createForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToPricing(): void {
    this.pricingActionsService.getPricing(this.pricingId)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (pricing: Pricing) => this.pricing = pricing
      });
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
    this.cdr.detectChanges();
  }

  updatePricing(): void {
    if (!this.eventPricingForm.valid) {
      return;
    }

    this.pricingService.updatePricing(this.eventId, { ...this.eventPricingForm.value, id: this.pricing.id })
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
