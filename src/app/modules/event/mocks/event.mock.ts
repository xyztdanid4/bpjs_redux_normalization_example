import { IEvent } from '../interfaces/event.interface';

export const EVENT_MOCK: IEvent[] = [
  {
    id: 1,
    name: 'BudapestJs meetup July',
    place: {
      id: 1,
      name: 'Interticket Dev HQ',
      address: '1139, Budapest, Váci út 99'
    },
    pricings: [
      {
        id: 1,
        name: 'Single event',
        price: 100
      },
      {
        id: 2,
        name: 'Multiple event',
        price: 200
      },
      {
        id: 3,
        name: 'Workshop event',
        price: 300
      }
    ]
  },
  {
    id: 2,
    name: 'BudapestJs meetup August',
    place: {
      id: 2,
      name: 'Supercharge HQ',
      address: '1075, Budapest, Károly krt. 9'
    },
    pricings: [
      {
        id: 4,
        name: 'Single event',
        price: 1000
      },
      {
        id: 5,
        name: 'Multiple event',
        price: 2000
      },
      {
        id: 6,
        name: 'Workshop event',
        price: 30000
      }
    ]
  },
  {
    id: 3,
    name: 'BudapestJs meetup September',
    place: {
      id: 3,
      name: 'Adnovum HQ',
      address: '1083, Budapest, Bókay János u. 44-46'
    },
    pricings: [
      {
        id: 7,
        name: 'Single event',
        price: 7
      },
      {
        id: 8,
        name: 'Multiple event',
        price: 8
      },
      {
        id: 9,
        name: 'Workshop event',
        price: 9
      }
    ]
  }
];
