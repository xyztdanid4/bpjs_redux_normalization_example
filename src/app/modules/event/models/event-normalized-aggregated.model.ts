import { NormalizedCollection } from '@core/models/normalized-collection.model';
import { EventListItem } from './event-list-item.model';
import { Place } from './place.model';
import { Pricing } from './pricing.model';

export class EventNormalizedAggregated {
  readonly events?: number[];
  readonly eventListItem?: NormalizedCollection<EventListItem>;
  readonly place?: NormalizedCollection<Place>;
  readonly pricing?: NormalizedCollection<Pricing>;
}
