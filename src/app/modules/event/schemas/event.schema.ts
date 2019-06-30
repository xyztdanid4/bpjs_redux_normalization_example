import { schema } from 'normalizr';

const placeSchema: schema.Entity = new schema.Entity('place', undefined, { idAttribute: value => value.id });

const pricingSchema: schema.Entity = new schema.Entity('pricing', undefined, { idAttribute: value => value.id });

// tslint:disable-next-line:max-line-length
const eventListItemSchema: schema.Entity = new schema.Entity('eventListItem', { pricings: [pricingSchema], place: placeSchema }, { idAttribute: value => value.id });

export const eventListSchema: schema.Entity[] = [eventListItemSchema];
