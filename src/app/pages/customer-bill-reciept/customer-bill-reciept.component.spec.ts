import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBillRecieptComponent } from './customer-bill-reciept.component';

describe('CustomerBillRecieptComponent', () => {
  let component: CustomerBillRecieptComponent;
  let fixture: ComponentFixture<CustomerBillRecieptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerBillRecieptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBillRecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
