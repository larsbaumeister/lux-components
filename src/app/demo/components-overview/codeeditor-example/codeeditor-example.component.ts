import { Component, OnInit } from '@angular/core';
import { MonacoEditorService } from '../../../modules/lux-codeeditor/monaco-editor.service';

@Component({
  selector: 'lux-codeeditor-example',
  templateUrl: './codeeditor-example.component.html',
  styleUrls: ['./codeeditor-example.component.scss']
})
export class CodeeditorExampleComponent implements OnInit {

  constructor(
    private monacoEditorService: MonacoEditorService
  ) { }

  ngOnInit(): void {
    this.monacoEditorService.load();
  }

}
