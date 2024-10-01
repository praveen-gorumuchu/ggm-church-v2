import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { NumberConstant } from '../constants/number-constant';
import { StringConstant } from '../constants/string-constant';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appEnterTabAutoOption]'
})

export class AppEnterTabAutocompleteDirective {
  @Input('appEnterTabAutoOption') ctrl: AbstractControl;

  constructor(private el: ElementRef, private auto: MatAutocompleteTrigger) { }
  @HostListener(StringConstant.KeyDown, ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.type === StringConstant.KeyDown) {
      if (event.key === StringConstant.Tab && this.ctrl.value &&
        this.ctrl.value.length >= NumberConstant.ONE) {
        if (this.auto.panelOpen) {
          event.preventDefault();
          this.auto.closePanel();
        }
        this.selectValue();
      }
    }
  }

  @HostListener(StringConstant.FocusOut)
  onFocusOut() {
    // this.selectValue();
  }

  selectValue() {
    const options = this.auto.autocomplete.options;
    if (options && options.length > NumberConstant.ZERO && options.first &&
      options.first.value) {
      this.ctrl.patchValue(options.first.value)
    }
  }

}
