import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { EventRoutes } from './event.routes';
import { EventComponent } from './components/event/event.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(EventRoutes)
  ],
  declarations: [
    EventComponent
  ]
})
export class EventModule { }
