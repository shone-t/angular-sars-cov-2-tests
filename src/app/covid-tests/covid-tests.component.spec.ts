import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidTestsComponent } from './covid-tests.component';

describe('CovidTestsComponent', () => {
  let component: CovidTestsComponent;
  let fixture: ComponentFixture<CovidTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidTestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
