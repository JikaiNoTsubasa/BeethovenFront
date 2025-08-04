import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from "@angular/animations";

export function FadeIn(timingIn: number, height: boolean = false): AnimationTriggerMetadata  {
    return trigger('fadeIn', [
      transition(':enter', [
        style(height ? { opacity: 0 , height: 0, } : { opacity: 0, }),
        animate(timingIn, style(height ? { opacity: 1, height: 'fit-content' } : { opacity: 1, })),
      ]),
    ]);
}

export function OpenClose(): AnimationTriggerMetadata  {
  return trigger('openClose', [
      state('closed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden',
        padding: '0px'
      })),
      state('open', style({
        height: '*',
        opacity: 1,
        overflow: 'hidden',
        padding: '*'
      })),
      transition('closed <=> open', [
        animate('300ms cubic-bezier(.4,0,.2,1)')
      ]),
    ]);
}