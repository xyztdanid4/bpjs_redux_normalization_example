import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AppSkeletonRoutes } from './app-skeleton.routes';
import { AppRootComponent } from './components/app-root/app-root.component';
import { HeaderComponent } from './components/header/header.component';
import { PageContentComponent } from './components/page-content/page-content.component';
import { FooterComponent } from './components/footer/footer.component';

// Router components
import { EventRouterComponent} from '@modules/event/event.router';

const routes = [
  EventRouterComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(AppSkeletonRoutes)
  ],
  declarations: [
    AppRootComponent,
    HeaderComponent,
    PageContentComponent,
    FooterComponent,
    ...routes
  ]
})
export class AppSkeletonModule { }
