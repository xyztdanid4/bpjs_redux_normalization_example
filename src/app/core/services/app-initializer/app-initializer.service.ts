import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState, rootReducer } from '@core/reducers/root.reducer';
import { Middleware } from 'redux';
import { environment } from '@env/environment';
import { createLogger } from 'redux-logger';
import { of } from 'rxjs';

export function appInitializerFactory(appInitializer: AppInitializerService): () => Promise<boolean> {
  return (): Promise<boolean> => appInitializer.load();
}

@Injectable()
export class AppInitializerService {

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  private setStoreConfig(): void {
    const middleware: Middleware[] = !environment.production ? [createLogger()] : [];
    this.ngRedux.configureStore(rootReducer, {}, middleware);
  }

  load(): Promise<boolean> {
    this.setStoreConfig();
    return of(true).toPromise();
  }

}
