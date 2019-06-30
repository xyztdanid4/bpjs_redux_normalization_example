import { IEvent } from '../interfaces/event.interface';

export const EVENT_MOCK: IEvent[] = [
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
        id: 1,
        name: 'pricing_name_1',
        price: 1
      },
      {
        id: 2,
        name: 'pricing_name_2',
        price: 2
      },
      {
        id: 3,
        name: 'pricing_name_3',
        price: 3
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
        id: 4,
        name: 'pricing_name_4',
        price: 4
      },
      {
        id: 5,
        name: 'pricing_name_5',
        price: 5
      },
      {
        id: 6,
        name: 'pricing_name_6',
        price: 6
      }
    ]
  },
  {
    id: 3,
    name: 'event_name_3',
    place: {
      id: 3,
      name: 'place_name_3',
      address: 'place_address_3'
    },
    pricings: [
      {
        id: 7,
        name: 'pricing_name_7',
        price: 7
      },
      {
        id: 8,
        name: 'pricing_name_8',
        price: 8
      },
      {
        id: 9,
        name: 'pricing_name_9',
        price: 9
      }
    ]
  }
];
