// Angular Modules
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Core Modules, Services
import { AppInitializerService, appInitializerFactory } from '@core/services/app-initializer/app-initializer.service';
import { AppRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { SharedModule } from '@shared/shared.module';

// App Core Components
import { AppRouterComponent } from './app.router';
import { AppSkeletonRouterComponent } from '@modules/app-skeleton/app-skeleton.router';
import { PageNotFoundComponent } from '@core/components/page-not-found/page-not-found.component';
import { NgReduxModule } from '@angular-redux/store';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, { useHash: true }),
    NgReduxModule,
    CoreModule,
    SharedModule
  ],

  declarations: [
    AppRouterComponent,
    AppSkeletonRouterComponent,
    PageNotFoundComponent
  ],

  providers: [
    AppInitializerService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [AppInitializerService],
      multi: true
    }
  ],

  bootstrap: [
    AppRouterComponent
  ]
})
export class AppModule { }
