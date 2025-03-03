import { Component } from '@angular/core';
import { LuxTextboxColor } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'lux-textbox-example',
  templateUrl: './textbox-example.component.html',
  styleUrls: ['./textbox-example.component.scss']
})
export class TextboxExampleComponent {
  title = 'Information';
  color: LuxTextboxColor | undefined;
  icon = 'lux-interface-alert-information-circle';
  colorOptions = [
    { label: 'default', value: '' },
    { label: 'blue', value: 'blue' },
    { label: 'green', value: 'green' },
    { label: 'yellow', value: 'yellow' },
    { label: 'red', value: 'red' }
  ];

  constructor() {
    this.color = 'blue';
  }

  onColorChanged(_color: { label: string; value: LuxTextboxColor }) {
    this.color = _color.value;
  }
}
