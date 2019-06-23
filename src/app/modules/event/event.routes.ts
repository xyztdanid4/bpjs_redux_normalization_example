import { Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';

export const EventRoutes: Routes = [
  {
    path: '',
    component: EventListComponent
  }
];
