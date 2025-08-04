import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextLive } from './input-text-live';

describe('InputTextLive', () => {
  let component: InputTextLive;
  let fixture: ComponentFixture<InputTextLive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextLive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTextLive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
