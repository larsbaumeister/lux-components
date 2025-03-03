import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { LuxThemePalette } from '../../../lux-util/lux-colors.enum';
import { ILuxChipSelected } from '../lux-chips-model/lux-chip-selected.interface';

@Component({
  selector: 'lux-chip-group',
  template: ''
})
export class LuxChipGroupComponent {
  private _luxColor: LuxThemePalette = 'primary';

  @ContentChild(TemplateRef) tempRef?: TemplateRef<any>;

  @Output() luxChipClicked = new EventEmitter<number>();
  @Output() luxChipAdded = new EventEmitter<string>();
  @Output() luxChipRemoved = new EventEmitter<number>();
  @Output() luxChipSelected = new EventEmitter<ILuxChipSelected>();

  @Input() luxLabels: string[] = [];
  @Input() luxDisabled = false;
  @Input() luxRemovable = true;
  @Input() luxSelected = true;

  get luxColor(): LuxThemePalette {
    return this._luxColor;
  }

  @Input() set luxColor(color: LuxThemePalette) {
    if (color !== 'primary' && color !== 'accent' && color !== 'warn') {
      color = undefined;
    }
    this._luxColor = color;
  }

  constructor() {}

  add(label: string) {
    if (!this.luxLabels) {
      this.luxLabels = [];
    }

    this.luxLabels.push(label);
    this.luxChipAdded.emit(label);
  }

  remove(index: number) {
    this.luxChipRemoved.emit(index);
    this.luxLabels.splice(index, 1);
  }

  click(index: number) {
    this.luxChipClicked.emit(index);
  }

  select(selected: boolean, index: number) {
    this.luxChipSelected.emit({ index, selected });
  }
}
