import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { basicSetup } from 'codemirror';
import { xml } from '@codemirror/lang-xml';

import { EditorView } from '@codemirror/view';

@Component({
  selector: 'lux-code-editor',
  templateUrl: './lux-code-editor.component.html',
  styleUrls: ['./lux-code-editor.component.scss']
})
export class LuxCodeEditorComponent implements OnInit, AfterViewInit {

  @ViewChild('container') container!: ElementRef;
  
  @Input() set content(value: string) {
    this._content = value;
    const editorValue = this.view.state.doc.toString();
    if (editorValue !== value) {
      this.view.dispatch({
        changes: {
          from: 0,
          to: editorValue.length,
          insert: value || ""
        }
      });
    }
  }
  get content() {
    return this._content;
  }

  @Output() contentChange = new EventEmitter<string>();

  private _content = '';
  private view!: EditorView;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.view = new EditorView({
      doc: this.content,

      parent: this.container.nativeElement,
      extensions: [
        basicSetup,
        xml(),
        EditorView.updateListener.of(e => { this.contentChange.next(e.state.doc.toString()) })
      ]
    });
    
  }

  

}
