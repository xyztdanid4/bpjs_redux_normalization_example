import { combineReducers } from 'redux';
import { Event } from '../../modules/event/models/event.model';
import { EventReducer } from './event.reducer';

export interface IAppState {
  events?: Event[];
}

export const rootReducer = combineReducers({
  events: EventReducer
});
