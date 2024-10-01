import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appShortcuts]'
})
export class ShortcutsDirective {

  constructor(private el: ElementRef) { }

  @HostListener('document:keydown.control.s', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if(event.ctrlKey) {
      event.preventDefault();
      this.el.nativeElement.click();
    }
  }
  

}
