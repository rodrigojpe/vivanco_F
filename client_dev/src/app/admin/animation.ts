import {  trigger,  state,  style,  animate,  transition} from '@angular/animations';

export const FadeLateral =
  trigger('FadeLateral', [
    transition(':enter',[
      style({
        opacity: 0,
        transform: 'translateX(-40%)',
      }),
      animate('500ms linear',
      style({
        opacity: 1.5,
        transform: 'translateX(0)',

      }))
    ])
]);
