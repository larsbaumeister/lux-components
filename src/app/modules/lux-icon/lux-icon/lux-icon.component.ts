import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { LuxBadgeColors, LuxIconColor, LuxIconColors } from "../../lux-util/lux-colors.enum";
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxIconRegistryService } from './lux-icon-registry.service';

@Component({
  selector: 'lux-icon',
  templateUrl: './lux-icon.component.html',
  styleUrls: ['./lux-icon.component.scss']
})
export class LuxIconComponent {
  public static readonly FA_BRAND = 'fab ';
  public static readonly FA_SOLID = 'fas ';
  public static readonly FA_REGULAR = 'far ';
  public static readonly FA_LIGHT = 'fal ';

  private _luxIconSize: string | undefined = '';
  private _luxIconName = '';
  private _luxPadding = '4px';
  private _backgroundCSSClass = '';
  private _fontCSSClass = 'blue';

  currentIconSize = 1;


  @HostBinding('style.margin') styleMargin = '0';
  @HostBinding('class.lux-lx-icon') isIconLX = false;
  @HostBinding('class.lux-fa-icon') isIconFA = false;
  @HostBinding('class.lux-no-size') noSize = true;
 
  @Input() luxRounded = false;

  get luxMargin(): string {
    return this.styleMargin;
  }

  // 'standard margin Werte z.B. '5px 4px 3px 2px'
  @Input() set luxMargin(margin: string) {
    this.styleMargin = margin;
  }

  get luxPadding(): string {
    return this._luxPadding;
  }

  // standard padding Werte z.B. '5px 4px 3px 2px'
  @Input() set luxPadding(padding: string) {
    this._luxPadding = padding;
  }

  get luxIconSize(): string | undefined {
    return this._luxIconSize;
  }

  @Input() set luxIconSize(iconSizeValue: string | undefined) {
    this._luxIconSize = iconSizeValue;
    if (this.luxIconSize && this.luxIconSize.length === 2) {
      this.currentIconSize = +this.luxIconSize.slice(0, 1);
      this.noSize = false;
    } else {
      this.currentIconSize = 1;
      this.noSize = true;
    }
  }

  get luxIconName(): string | undefined {
    return this._luxIconName;
  }

  @Input()
  set luxIconName(iconNameValue: string | undefined) {
    if (iconNameValue) {
      this._luxIconName = this.modifyIconName(iconNameValue);
    } else {
      this._luxIconName = '';
    }
  }

  get backgroundCSSClass() {
    return this._backgroundCSSClass;
  }

  public get fontCSSClass() {
    return this._fontCSSClass;
  }

  @Input()
  set luxColor(color: LuxIconColor) {
    if (LuxIconColors.find((entry) => entry === color)) {
      const result = LuxUtil.getColorsByBgColorsEnum(color);
      this._backgroundCSSClass = result.backgroundCSSClass;
      this._fontCSSClass = result.fontCSSClass;
    } else {
      this._backgroundCSSClass = '';
      this._fontCSSClass = '';
    }
  }

  @Output() luxLoad = new EventEmitter<Event>()

  constructor(private iconReg: LuxIconRegistryService) {  }

  /**
   * Generiert aus dem mitgegebenen Wert einen String-Wert
   * der entweder als Font-Awesome Icon oder als Material-Icon
   * interpretiert werden kann.
   *
   * @param iconName z.B. fas fa-cogs
   * @param iconName
   * @returns string
   */
  private modifyIconName(iconName: string): string {
    // Handelt es sich hier um ein Font-Awesome Icon?
    if (iconName.startsWith('fa')) {
      // feststellen, ob ein FA-Präfix vorliegt
      if (
        iconName.indexOf(LuxIconComponent.FA_BRAND) === -1 &&
        iconName.indexOf(LuxIconComponent.FA_SOLID) === -1 &&
        iconName.indexOf(LuxIconComponent.FA_REGULAR) === -1 &&
        iconName.indexOf(LuxIconComponent.FA_LIGHT) === -1
      ) {
        // Wenn nicht, dann
        iconName = 'fas ' + iconName;
      }
      this.isIconFA = true;
      this.isIconLX = false;
      return iconName;
    }
    if (iconName.startsWith('lux')) {
      this.isIconLX = true;
      this.isIconFA = false;
      this.registerIcon(iconName);
      return iconName;
    }

    this.isIconFA = false;
    this.isIconLX = false;
    return iconName;
  }

  private registerIcon(iconName:string) {
    if (this.isIconLX) {
      try {
        this.iconReg.registerIcon(iconName);
      } catch (error) {
        console.log(error);
        this._luxIconName = 'lux-interface-alert-warning-diamond';
      }
    }
  }
}
