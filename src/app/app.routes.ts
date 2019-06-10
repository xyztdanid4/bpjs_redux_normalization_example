import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '@core/components/page-not-found/page-not-found.component';
import { AppSkeletonRouterComponent } from '@modules/app-skeleton/app-skeleton.router';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AppSkeletonRouterComponent,
    loadChildren: 'app/modules/app-skeleton/app-skeleton.module#AppSkeletonModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
