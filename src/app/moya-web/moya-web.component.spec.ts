import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoyaWebComponent } from './moya-web.component';

describe('MoyaWebComponent', () => {
  let component: MoyaWebComponent;
  let fixture: ComponentFixture<MoyaWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoyaWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoyaWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
