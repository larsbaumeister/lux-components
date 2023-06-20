import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxCodeEditorComponent } from './lux-code-editor.component';

describe('LuxCodeEditorComponent', () => {
  let component: LuxCodeEditorComponent;
  let fixture: ComponentFixture<LuxCodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuxCodeEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuxCodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
