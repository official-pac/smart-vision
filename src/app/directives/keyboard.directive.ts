import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DataShareService } from '../services/data-share.service';

@Directive({
  selector: '[appKeyboard]',
  standalone: true
})
export class KeyboardDirective {

  elementRef: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
  constructor(private el: ElementRef, private dataShareService: DataShareService, private ngControl: NgControl) { }

  @HostListener('focus')
  onFocus() {
    try {
      this.dataShareService.setFocusedElement({ elementRef: this.elementRef, control: this.ngControl });
    } catch (error) { console.log(error); }
  }

}
