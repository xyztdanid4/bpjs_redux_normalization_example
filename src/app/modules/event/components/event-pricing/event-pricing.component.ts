import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Pricing } from '@modules/event/models/pricing.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PricingService } from '@modules/event/services/pricing/pricing.service';
import { take, finalize, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-event-pricing',
  templateUrl: './event-pricing.component.html',
  styleUrls: ['./event-pricing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPricingComponent implements OnInit, OnDestroy, OnChanges {

  private readonly destroy$ = new Subject<void>();

  isModalOpen: boolean;
  eventPricingForm: FormGroup;
  pricing: Pricing;

  @Input() readonly eventPricing$: Observable<Pricing>;

  constructor(
    private formBuilder: FormBuilder,
    private pricingService: PricingService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscribeToPricing();
    this.eventPricingForm = this.createForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGED', 'EVENT-PRICING', changes);
  }

  get runChangeDetection() {
    console.log('EVENT-PRICING - Checking the view');
    return true;
  }

  private subscribeToPricing(): void {
    this.eventPricing$
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
    this.changeDetectorRef.detectChanges();
  }

  updatePricing(): void {
    if (!this.eventPricingForm.valid) {
      return;
    }

    this.pricingService.updatePricing({ id: this.pricing.id, ...this.eventPricingForm.value })
      .pipe(
        take(1),
        finalize(() => this.closeModal())
      )
      .subscribe();
  }

  deletePricing(): void {
    this.pricingService.deletePricing(this.pricing.eventId, this.pricing.id)
      .pipe(
        take(1)
      )
      .subscribe();
  }

}
