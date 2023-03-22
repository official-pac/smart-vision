import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { ElementFocus, KeyBoardKey } from 'src/app/services/interface';

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
  numericKeys: Array<KeyBoardKey> = [];
  aplhaKeyRowOne: Array<KeyBoardKey> = [];
  aplhaKeyRowTwo: Array<KeyBoardKey> = [];
  aplhaKeyRowThree: Array<KeyBoardKey> = [];
  constructor(private dataShareService: DataShareService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initSubscription();
    this.loadKeys();
  }

  private loadKeys(): void {
    // TODO: To be loaded from local JSON file
    this.numericKeys = NUM_KEYS;
    this.aplhaKeyRowOne = ALPHA_KEYS_ROW_ONE;
    this.aplhaKeyRowTwo = ALPHA_KEYS_ROW_TWO;
    this.aplhaKeyRowThree = ALPHA_KEYS_ROW_THREE;
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

  trackByFn(index: number, key: KeyBoardKey) {
    return key.id;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

export const NUM_KEYS = [
  { id: 1, displayName: '1', value: 1 },
  { id: 2, displayName: '2', value: 2 },
  { id: 3, displayName: '3', value: 3 },
  { id: 4, displayName: '4', value: 4 },
  { id: 5, displayName: '5', value: 5 },
  { id: 6, displayName: '6', value: 6 },
  { id: 7, displayName: '7', value: 7 },
  { id: 8, displayName: '8', value: 8 },
  { id: 9, displayName: '9', value: 9 },
  { id: 0, displayName: '0', value: 0 },
];

export const ALPHA_KEYS_ROW_ONE = [
  { id: 10, displayName: 'q', value: 'q' },
  { id: 11, displayName: 'w', value: 'w' },
  { id: 12, displayName: 'e', value: 'e' },
  { id: 13, displayName: 'r', value: 'r' },
  { id: 14, displayName: 't', value: 't' },
  { id: 15, displayName: 'y', value: 'y' },
  { id: 16, displayName: 'u', value: 'u' },
  { id: 17, displayName: 'i', value: 'i' },
  { id: 18, displayName: 'o', value: 'o' },
  { id: 19, displayName: 'p', value: 'p' }
];

export const ALPHA_KEYS_ROW_TWO = [
  { id: 20, displayName: 'a', value: 'a' },
  { id: 21, displayName: 's', value: 's' },
  { id: 22, displayName: 'd', value: 'd' },
  { id: 23, displayName: 'f', value: 'f' },
  { id: 24, displayName: 'g', value: 'g' },
  { id: 25, displayName: 'h', value: 'h' },
  { id: 26, displayName: 'j', value: 'j' },
  { id: 27, displayName: 'k', value: 'k' },
  { id: 28, displayName: 'l', value: 'l' },
];
export const ALPHA_KEYS_ROW_THREE = [
  { id: 29, displayName: 'z', value: 'z' },
  { id: 30, displayName: 'x', value: 'x' },
  { id: 31, displayName: 'c', value: 'c' },
  { id: 32, displayName: 'v', value: 'v' },
  { id: 33, displayName: 'b', value: 'b' },
  { id: 34, displayName: 'n', value: 'n' },
  { id: 45, displayName: 'm', value: 'm' },
];
