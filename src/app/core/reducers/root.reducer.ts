import { combineReducers } from 'redux';
import { NormalizedCollection } from '@core/models/normalized-collection.model';
import { Place } from '@modules/event/models/place.model';
import { Pricing } from '@modules/event/models/pricing.model';
import { EventListReducer } from './event-list.reducer';
import { EventListItemReducer } from './event-list-item.reducer';
import { PlaceReducer } from './place.reducer';
import { PricingReducer } from './pricing.reducer';
import { EventListItem } from '@modules/event/models/event-list-item.model';

export interface IAppState {
  eventList?: number[];
  eventListItem?: NormalizedCollection<EventListItem>;
  place?: NormalizedCollection<Place>;
  pricing?: NormalizedCollection<Pricing>;
}

export const rootReducer = combineReducers({
  eventList: EventListReducer,
  eventListItem: EventListItemReducer,
  place: PlaceReducer,
  pricing: PricingReducer
});
