import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '@core/components/page-not-found/page-not-found.component';
import { AppSkeletonRouterComponent } from '@modules/app-skeleton/app-skeleton.router';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AppSkeletonRouterComponent,
    loadChildren: () => import('app/modules/app-skeleton/app-skeleton.module').then(m => m.AppSkeletonModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
