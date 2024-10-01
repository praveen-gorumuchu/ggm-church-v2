import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAppFocusOnMe]'
})
export class AppFocusOnMeDirective {
  @Input() appAppFocusOnMe?: boolean;
  constructor(el: ElementRef) {
    el.nativeElement.focus();
    el.nativeElement.autofocus = true;
  }

}
