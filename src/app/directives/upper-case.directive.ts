import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUpperCase]',
  standalone: true
})
export class UpperCaseDirective {

  elementRef: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
  constructor(private el: ElementRef) { }

  @HostListener('keyup')
  onChange() {
    this.elementRef.value = this.elementRef.value.toUpperCase();
  }

}
