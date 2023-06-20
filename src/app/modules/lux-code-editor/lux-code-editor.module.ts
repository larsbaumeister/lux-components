import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuxCodeEditorComponent } from './lux-code-editor/lux-code-editor.component';



@NgModule({
  declarations: [
    LuxCodeEditorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LuxCodeEditorComponent
  ]
})
export class LuxCodeEditorModule { }
