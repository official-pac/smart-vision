import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSlotSelectionComponent } from './parking-slot-selection.component';

describe('ParkingSlotSelectionComponent', () => {
  let component: ParkingSlotSelectionComponent;
  let fixture: ComponentFixture<ParkingSlotSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingSlotSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingSlotSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
