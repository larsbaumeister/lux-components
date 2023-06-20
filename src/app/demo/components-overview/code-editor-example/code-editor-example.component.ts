import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-code-editor-example',
  templateUrl: './code-editor-example.component.html'
})
export class CodeEditorExampleComponent implements OnInit {

  public content = '';

  constructor() { }

  ngOnInit(): void {}

}
