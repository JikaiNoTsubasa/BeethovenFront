import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalParameter } from './global-parameter';

describe('GlobalParameter', () => {
  let component: GlobalParameter;
  let fixture: ComponentFixture<GlobalParameter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalParameter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalParameter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
