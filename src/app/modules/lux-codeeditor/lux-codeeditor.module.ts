import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuxCodeeditorComponent } from './lux-codeeditor/lux-codeeditor.component';
import { MonacoEditorService } from './monaco-editor.service';

@NgModule({
  declarations: [
    LuxCodeeditorComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    MonacoEditorService
  ],
  exports: [
    LuxCodeeditorComponent
  ]
})
export class LuxCodeeditorModule { }
