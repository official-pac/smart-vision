import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsCashComponent } from './payments-cash.component';

describe('PaymentsCashComponent', () => {
  let component: PaymentsCashComponent;
  let fixture: ComponentFixture<PaymentsCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PaymentsCashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
