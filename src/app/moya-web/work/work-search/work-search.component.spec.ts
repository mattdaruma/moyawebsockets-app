import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSearchComponent } from './work-search.component';

describe('WorkSearchComponent', () => {
  let component: WorkSearchComponent;
  let fixture: ComponentFixture<WorkSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
