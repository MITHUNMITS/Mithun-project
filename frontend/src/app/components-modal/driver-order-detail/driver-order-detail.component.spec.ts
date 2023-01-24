import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverOrderDetailComponent } from './driver-order-detail.component';

describe('DriverOrderDetailComponent', () => {
  let component: DriverOrderDetailComponent;
  let fixture: ComponentFixture<DriverOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverOrderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
