import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs';
import { MonacoEditorService } from '../monaco-editor.service';

declare var monaco: any;

@Component({
  selector: 'lux-codeeditor',
  templateUrl: './lux-codeeditor.component.html',
  styleUrls: ['./lux-codeeditor.component.scss']
})
export class LuxCodeeditorComponent implements OnInit {

  constructor(private monacoEditorService: MonacoEditorService) { }

  ngOnInit(): void { }
  
  public _editor: any;
  @ViewChild('editorContainer', { static: true }) _editorContainer!: ElementRef;

  private initMonaco(): void {
    if(!this.monacoEditorService.loaded) {
      this.monacoEditorService.loadingFinished.pipe(first()).subscribe(() => {
        this.initMonaco();
      });
      return;
    }

    this._editor = monaco.editor.create(
      this._editorContainer.nativeElement,
      {}
    );
  }

  ngAfterViewInit(): void {
    this.initMonaco();
  }
}