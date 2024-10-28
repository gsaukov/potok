import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeDescComponent } from './trade-desc.component';

describe('TradeDescComponent', () => {
  let component: TradeDescComponent;
  let fixture: ComponentFixture<TradeDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeDescComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
