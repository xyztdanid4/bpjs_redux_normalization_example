import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { EventService } from './services/event.service';
import { EventSourceService } from './services/event-source.service';
import { IEventSource } from './interfaces/event.source.interface';
import { EventRoutes } from './event.routes';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventListItemComponent } from './components/event-list-item/event-list-item.component';
import { EventPlaceComponent } from './components/event-place/event-place.component';
import { EventPricingComponent } from './components/event-pricing/event-pricing.component';
import { EventActionsService } from './services/event-actions.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaceActionsService } from './services/place-actions.service';
import { IPlaceSource } from './interfaces/place-source.interface';
import { PlaceSourceService } from './services/place-source.service';
import { PricingActionsService } from './services/pricing-actions.service';
import { IPricingSource } from './interfaces/pricing-source.interface';
import { PricingSourceService } from './services/pricing-source.service';
import { PlaceService } from './services/place.service';
import { PricingService } from './services/pricing.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(EventRoutes),
    ReactiveFormsModule
  ],
  declarations: [
    EventListComponent,
    EventListItemComponent,
    EventPlaceComponent,
    EventPricingComponent
  ],
  providers: [
    EventActionsService,
    EventService,
    {
      provide: IEventSource,
      useClass: EventSourceService
    },
    PlaceActionsService,
    PlaceService,
    {
      provide: IPlaceSource,
      useClass: PlaceSourceService
    },
    PricingActionsService,
    PricingService,
    {
      provide: IPricingSource,
      useClass: PricingSourceService
    }
  ]
})
export class EventModule { }
