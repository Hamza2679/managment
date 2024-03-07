import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseticketComponent } from './raiseticket.component';

describe('RaiseticketComponent', () => {
  let component: RaiseticketComponent;
  let fixture: ComponentFixture<RaiseticketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RaiseticketComponent]
});
    fixture = TestBed.createComponent(RaiseticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
