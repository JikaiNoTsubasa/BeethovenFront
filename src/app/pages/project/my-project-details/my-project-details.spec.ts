import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectDetails } from './my-project-details';

describe('MyProjectDetails', () => {
  let component: MyProjectDetails;
  let fixture: ComponentFixture<MyProjectDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProjectDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProjectDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
