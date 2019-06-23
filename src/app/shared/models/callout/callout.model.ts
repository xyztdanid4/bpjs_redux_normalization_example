import { ICallout } from '@shared/interfaces/callout/callout.interface';
import { CalloutType } from '@shared/enums/callout-type.enum';

export class Callout implements ICallout {
  readonly title: string;
  readonly description: string | string[];
  readonly type: CalloutType;

  constructor(iCallout: ICallout) {
    this.title = iCallout.title;
    this.description = iCallout.description;
    this.type = iCallout.type;
  }
}
