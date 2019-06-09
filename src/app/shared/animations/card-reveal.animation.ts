import { trigger, transition, style, stagger, animate, query, AnimationTriggerMetadata } from '@angular/animations';

export const cardRevealAnimation: AnimationTriggerMetadata = trigger('cardRevealAnimation', [
  transition(':enter', [
    query('.animate', [
      style({ opacity: 0, transform: 'translate(-30px)' }),
      stagger(80, [
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ])
]);
