import { EventNormalizedAggregated } from './event-normalized-aggregated.model';
import { EventListItem } from './event-list-item.model';

export class EventAction {
  readonly type: string;
  readonly payload: EventNormalizedAggregated | EventListItem;
}
