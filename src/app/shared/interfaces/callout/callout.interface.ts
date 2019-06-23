import { CalloutType } from '@shared/enums/callout-type.enum';

export interface ICallout {
  title: string;
  description: string | string[];
  type: CalloutType;
}
