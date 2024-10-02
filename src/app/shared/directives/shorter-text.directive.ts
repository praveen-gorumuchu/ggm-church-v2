import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appShorterText]'
})
export class ShorterTextDirective implements OnInit {
  @Input('appShorterText') maxLength: number = 15; // Ensure this is defined correctly

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.truncateText();
  }

  private truncateText() {
    const originalText = this.el.nativeElement.textContent; // Get the original text
    const words = originalText.split(' '); // Split the text into words

    // If the text exceeds maxLength, truncate it
    if (originalText.length > this.maxLength) {
      const truncatedText = words.slice(0, 3).join(' ') + '...'; // Get first three words and append '...'
      this.el.nativeElement.textContent = truncatedText; // Set the truncated text
    }
  }
}
