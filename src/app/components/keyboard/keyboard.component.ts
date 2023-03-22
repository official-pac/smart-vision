import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { ElementFocus } from 'src/app/services/interface';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css'],
  imports: [CommonModule]
})
export class KeyboardComponent implements OnInit, OnDestroy {

  subscription?: Subscription;
  focusedElement!: ElementFocus;
  constructor(private dataShareService: DataShareService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initSubscription();
  }

  private initSubscription() {
    try {
      this.subscription = this.dataShareService.focusedElement$
        .subscribe((ele: ElementFocus) => {
          this.focusedElement = ele;
        })
    } catch (error) { console.log(error) }
  }

  onClick(value: string | number) {
    try {

      const elementRef = this.focusedElement.elementRef;
      let { selectionStart, selectionEnd } = elementRef;
      const formControl = this.focusedElement?.control.control;

      const currentValue: string = this.focusedElement?.control?.value;
      const newValue = currentValue.substring(0, (selectionStart || 0)) + value + currentValue.substring((selectionEnd || 0));

      formControl?.setValue(newValue);
      formControl?.markAsDirty();
      elementRef.focus();
      elementRef.selectionStart = elementRef.selectionEnd = (selectionStart || 0) + 1;

      this.cdRef.detectChanges();
    } catch (error) { console.log(error); }

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
