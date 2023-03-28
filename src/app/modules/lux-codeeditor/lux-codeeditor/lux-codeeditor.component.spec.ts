import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxCodeeditorComponent } from './lux-codeeditor.component';

describe('LuxCodeeditorComponent', () => {
  let component: LuxCodeeditorComponent;
  let fixture: ComponentFixture<LuxCodeeditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuxCodeeditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuxCodeeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
