import { Routes } from '@angular/router';
import { AppRootComponent } from './components/app-root/app-root.component';
import { EventRouterComponent } from '@modules/event/event.router';

export const AppSkeletonRoutes: Routes = [
  {
    path: '',
    component: AppRootComponent,
    children: [
      {
        path: '',
        component: EventRouterComponent,
        data: { title: '' },
        loadChildren: 'app/modules/event/event.module#EventModule'
      }
    ]
  }
];
