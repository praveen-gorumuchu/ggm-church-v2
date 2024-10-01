import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
selector: '[appalphaspecial]'
})
export class RestrictAlphaSpecial {
constructor(private el: ElementRef) { }
@HostListener('input', ['$event']) onInputChange(event: any) {
const initalValue = this.el.nativeElement.value;
this.el.nativeElement.value = initalValue.replace(/[^A-Za-z0-9/!"#$%&'()*+,\-./:;<=>?@\[\]\^_`{|}~\s]*/g, '');
if (initalValue !== this.el.nativeElement.value) {
 event.stopPropagation();
}
}
}
