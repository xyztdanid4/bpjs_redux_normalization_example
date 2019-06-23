import { IEvent } from '../interfaces/event.interface';

export const EVENT_MOCK: IEvent[] = [
  {
    id: 0,
    name: 'event_name_0',
    place: {
      id: 0,
      name: 'place_name_0',
      address: 'place_address_0'
    },
    pricings: [
      {
        id: 0,
        name: 'pricing_name_0',
        price: 123
      },
      {
        id: 1,
        name: 'pricing_name_1',
        price: 456
      },
      {
        id: 2,
        name: 'pricing_name_2',
        price: 789
      }
    ]
  },
  {
    id: 1,
    name: 'event_name_1',
    place: {
      id: 1,
      name: 'place_name_1',
      address: 'place_address_1'
    },
    pricings: [
      {
        id: 3,
        name: 'pricing_name_3',
        price: 1234
      },
      {
        id: 4,
        name: 'pricing_name_4',
        price: 2345
      },
      {
        id: 5,
        name: 'pricing_name_5',
        price: 3456
      }
    ]
  },
  {
    id: 2,
    name: 'event_name_2',
    place: {
      id: 2,
      name: 'place_name_2',
      address: 'place_address_2'
    },
    pricings: [
      {
        id: 6,
        name: 'pricing_name_7',
        price: 1
      },
      {
        id: 7,
        name: 'pricing_name_8',
        price: 2
      },
      {
        id: 8,
        name: 'pricing_name_8',
        price: 3
      }
    ]
  }
];
