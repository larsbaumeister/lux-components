import { Directive, ElementRef, Input, OnChanges, OnInit, Optional, Renderer2, SimpleChanges } from '@angular/core';
import { LuxDateTimePickerComponent } from '../../lux-form/lux-datetimepicker/lux-datetimepicker.component';
import { LuxFormSelectableBase } from "../../lux-form/lux-form-model/lux-form-selectable-base.class";
import { LuxLookupComponent } from "../../lux-lookup/lux-lookup-model/lux-lookup-component";
import { LuxThemePalette } from '../../lux-util/lux-colors.enum';
import { LuxDatetimepickerAcComponent } from '../../lux-form/lux-datetimepicker-ac/lux-datetimepicker-ac.component';
import { LuxFilterItem } from './lux-filter-item';
import { LuxInputComponent } from '../../lux-form/lux-input/lux-input.component';
import { LuxInputAcComponent } from '../../lux-form/lux-input-ac/lux-input-ac.component';
import { LuxDatepickerComponent } from '../../lux-form/lux-datepicker/lux-datepicker.component';
import { LuxDatepickerAcComponent } from '../../lux-form/lux-datepicker-ac/lux-datepicker-ac.component';
import { LuxToggleComponent } from '../../lux-form/lux-toggle/lux-toggle.component';
import { LuxToggleAcComponent } from '../../lux-form/lux-toggle-ac/lux-toggle-ac.component';
import { LuxSelectComponent } from '../../lux-form/lux-select/lux-select.component';
import { LuxSelectAcComponent } from '../../lux-form/lux-select-ac/lux-select-ac.component';
import { LuxFormComponentBase } from '../../lux-form/lux-form-model/lux-form-component-base.class';
import { LuxAutocompleteComponent } from '../../lux-form/lux-autocomplete/lux-autocomplete.component';
import { LuxAutocompleteAcComponent } from '../../lux-form/lux-autocomplete-ac/lux-autocomplete-ac.component';
import { LuxCheckboxComponent } from '../../lux-form/lux-checkbox/lux-checkbox.component';
import { LuxCheckboxAcComponent } from '../../lux-form/lux-checkbox-ac/lux-checkbox-ac.component';
import { LuxLookupComboboxComponent } from '../../lux-lookup/lux-lookup-combobox/lux-lookup-combobox.component';
import { LuxLookupComboboxAcComponent } from '../../lux-lookup/lux-lookup-combobox-ac/lux-lookup-combobox-ac.component';
import { LuxLookupAutocompleteComponent } from '../../lux-lookup/lux-lookup-autocomplete/lux-lookup-autocomplete.component';
import { LuxLookupAutocompleteAcComponent } from '../../lux-lookup/lux-lookup-autocomplete-ac/lux-lookup-autocomplete-ac.component';

export declare type LuxFilterRenderFnType<T = any> = (filter: LuxFilterItem<T>, value: T) => string;

@Directive({
  selector: '[luxFilterItem]'
})
export class LuxFilterItemDirective implements OnInit, OnChanges {
  filterItem: LuxFilterItem<any>;

  @Input() luxFilterColor: LuxThemePalette = undefined;
  @Input() luxFilterDefaultValues = [...LuxFilterItem.DEFAULT_VALUES];
  @Input() luxFilterRenderFn?: LuxFilterRenderFnType;
  @Input() luxFilterHidden = false;
  @Input() luxFilterDisabled = false;

  constructor(
    @Optional() public input: LuxInputComponent,
    @Optional() public inputAuthentic: LuxInputAcComponent,
    @Optional() public autoComplete: LuxAutocompleteComponent,
    @Optional() public autoCompleteAuthentic: LuxAutocompleteAcComponent,
    @Optional() public autoCompleteLookup: LuxLookupAutocompleteComponent,
    @Optional() public autoCompleteLookupAuthentic: LuxLookupAutocompleteAcComponent,
    @Optional() public datepicker: LuxDatepickerComponent,
    @Optional() public datepickerAuthentic: LuxDatepickerAcComponent,
    @Optional() public datetimepicker: LuxDateTimePickerComponent,
    @Optional() public datetimepickerAuthentic: LuxDatetimepickerAcComponent,
    @Optional() public toggle: LuxToggleComponent,
    @Optional() public toggleAuthentic: LuxToggleAcComponent,
    @Optional() public checkbox: LuxCheckboxComponent,
    @Optional() public checkboxAuthentic: LuxCheckboxAcComponent,
    @Optional() public select: LuxSelectComponent,
    @Optional() public selectAuthentic: LuxSelectAcComponent,
    @Optional() public selectLookup: LuxLookupComboboxComponent,
    @Optional() public selectLookupAuthentic: LuxLookupComboboxAcComponent,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {
    let formComponent: LuxFormComponentBase;
    if (this.input) {
      formComponent = this.input;
    } else if (this.inputAuthentic) {
      formComponent = this.inputAuthentic;
    } else if (this.datepicker) {
      formComponent = this.datepicker;
    } else if (this.datepickerAuthentic) {
      formComponent = this.datepickerAuthentic;
    } else if (this.datetimepicker) {
      formComponent = this.datetimepicker;
    } else if (this.datetimepickerAuthentic) {
      formComponent = this.datetimepickerAuthentic;
    } else if (this.toggle) {
      formComponent = this.toggle;
    } else if (this.toggleAuthentic) {
      formComponent = this.toggleAuthentic;
    } else if (this.checkbox) {
      formComponent = this.checkbox;
    } else if (this.checkboxAuthentic) {
      formComponent = this.checkboxAuthentic;
    } else if (this.select) {
      formComponent = this.select;
    } else if (this.selectAuthentic) {
      formComponent = this.selectAuthentic;
    } else if (this.autoComplete) {
      formComponent = this.autoComplete;
    } else if (this.autoCompleteAuthentic) {
      formComponent = this.autoCompleteAuthentic;
    } else if (this.autoCompleteLookup) {
      formComponent = this.autoCompleteLookup;
    } else if (this.autoCompleteLookupAuthentic) {
      formComponent = this.autoCompleteLookupAuthentic;
    } else if (this.selectLookup) {
      formComponent = this.selectLookup;
    } else if (this.selectLookupAuthentic) {
      formComponent = this.selectLookupAuthentic;
    }   else {
      throw Error(`Die Formularkomponente ist unbekannt!`);
    }

    if (!formComponent.luxControlBinding) {
      throw Error(`Die Formularkomponente "${formComponent.luxLabel}" hat kein Binding!`);
    }

    this.filterItem = new LuxFilterItem<any>(formComponent.luxLabel, formComponent.luxControlBinding, formComponent);
  }

  ngOnInit(): void {
    this.filterItem.color = this.luxFilterColor;
    this.filterItem.defaultValues = this.luxFilterDefaultValues;
    this.filterItem.value = this.luxFilterDefaultValues[0];
    this.filterItem.component.formControl.setValue(this.filterItem.value);
    this.filterItem.hidden = this.luxFilterHidden;
    this.filterItem.disabled = this.luxFilterDisabled;

    if (this.luxFilterRenderFn) {
      this.filterItem.renderFn = this.luxFilterRenderFn;
    } else {
      if (
        this.filterItem.component instanceof LuxToggleComponent ||
        this.filterItem.component instanceof LuxCheckboxComponent ||
        this.filterItem.component instanceof LuxToggleAcComponent ||
        this.filterItem.component instanceof LuxCheckboxAcComponent
      ) {
        this.filterItem.renderFn = this.renderToggleFn;
      } else if ( this.filterItem.component instanceof LuxDatepickerComponent ) {
        this.filterItem.renderFn = this.renderDateFn;
      } else if ( this.filterItem.component instanceof LuxDatepickerAcComponent ) {
        this.filterItem.renderFn = this.renderDateAcFn;
      } else if ( this.filterItem.component instanceof LuxDateTimePickerComponent ) {
        this.filterItem.renderFn = this.renderDateTimeFn;
      } else if ( this.filterItem.component instanceof LuxDatetimepickerAcComponent ) {
        this.filterItem.renderFn = this.renderDateTimeAcFn;
      } else if (
        this.filterItem.component instanceof LuxSelectComponent ||
        this.filterItem.component instanceof LuxAutocompleteComponent ||
        this.filterItem.component instanceof LuxLookupComboboxComponent ||
        this.filterItem.component instanceof LuxLookupAutocompleteComponent ||
        this.filterItem.component instanceof LuxSelectAcComponent ||
        this.filterItem.component instanceof LuxAutocompleteAcComponent ||
        this.filterItem.component instanceof LuxLookupComboboxAcComponent ||
        this.filterItem.component instanceof LuxLookupAutocompleteAcComponent
      ) {
        this.filterItem.renderFn = this.renderLabelFn;
      } else {
        this.filterItem.renderFn = this.renderIdentityFn;
      }
    }

    this.updateHiddenState(this.luxFilterHidden);
    this.updateDisabledState(this.luxFilterDisabled);
  }

  private updateHiddenState(hidden: boolean) {
    if (this.filterItem) {
      // Wenn ein Filterelement ausgeblendet wird, wird es zusätzlich deaktiviert,
      // um es in der Filterkomponente leichter behandeln zu können. An die CSS-Klasse 'lux-display-none'
      // kommt man dynamisch nicht so einfach heran.
      if (hidden) {
        this.renderer.addClass(this.elRef.nativeElement, 'lux-display-none-important');
        this.filterItem.component.formControl.disable();
      } else {
        this.renderer.removeClass(this.elRef.nativeElement, 'lux-display-none-important');
        this.filterItem.component.formControl.enable();
      }
    }
  }

  private updateDisabledState(disabled: boolean) {
    if (this.filterItem) {
      if (disabled) {
        this.filterItem.component.formControl.disable();
      } else {
        this.filterItem.component.formControl.enable();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.filterItem) {
      if (this.filterItem.component && changes && changes.luxFilterHidden) {
        this.updateHiddenState(changes[ 'luxFilterHidden' ].currentValue);
      } else if (this.filterItem.component && changes && changes.luxFilterDisabled) {
        this.updateDisabledState(changes[ 'luxFilterDisabled' ].currentValue);
      }
    }
  }

  renderLabelFn<T>(filterItem: LuxFilterItem<T>, value: T) {
    if (typeof value === 'string') {
      return value;
    } else if (typeof value === "object" &&
               (filterItem.component instanceof LuxFormSelectableBase || filterItem.component instanceof LuxAutocompleteComponent || filterItem.component instanceof LuxAutocompleteAcComponent)) {
      return (value as any)[filterItem.component.luxOptionLabelProp!];
    } else if (filterItem.component instanceof  LuxLookupComponent) {
      return filterItem.component.getLabel(value);
    } else {
      return value;
    }
  }

  renderDateFn<T>(filterItem: LuxFilterItem<T>) {
    return (filterItem.component as any).datepickerInput.nativeElement.value;
  }
  renderDateAcFn(filterItem: LuxFilterItem, value: any) {
    return (filterItem.component as any).datepickerInput.nativeElement.value;
  }

  renderDateTimeFn<T>(filterItem: LuxFilterItem<T>) {
    return (filterItem.component as any).dateTimePickerInputEl.nativeElement.value;
  }
  renderDateTimeAcFn(filterItem: LuxFilterItem, value: any) {
    return (filterItem.component as LuxDatetimepickerAcComponent).dateTimePickerInputEl.nativeElement.value;
  }

  renderToggleFn<T>(filterItem: LuxFilterItem<T>, value: any) {
    return value ? 'an' : 'aus';
  }

  renderIdentityFn<T>(filterItem: LuxFilterItem<T>, value: any) {
    return value;
  }
}
