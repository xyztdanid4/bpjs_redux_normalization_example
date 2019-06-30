import { IEventListItem } from '../interfaces/event-list-item.interface';

export class EventListItem implements IEventListItem {

  readonly id: number;
  readonly name: string;
  readonly place: number;
  readonly pricings: number[];

  constructor(iEventListItem: IEventListItem) {
    this.id = iEventListItem.id;
    this.name = iEventListItem.name;
    this.place = iEventListItem.place;
    this.pricings = [...iEventListItem.pricings];
  }

}
