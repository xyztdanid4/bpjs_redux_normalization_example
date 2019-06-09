import { trigger, state, style, transition, animate, AnimationTriggerMetadata } from '@angular/animations';

export const accordionExtendAnimation: AnimationTriggerMetadata =
  trigger('accordionExtendAnimation', [
    state('collapsed', style({ height: '0px', minHeight: '0' })),
    state('expanded', style({ height: '*' })),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
  ]);
