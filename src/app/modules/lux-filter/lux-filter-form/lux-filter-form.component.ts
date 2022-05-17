import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LuxActionColorType } from '../../lux-action/lux-action-model/lux-action-component-base.class';
import { LuxSelectComponent } from '../../lux-form/lux-select/lux-select.component';
import { LuxDialogService } from '../../lux-popups/lux-dialog/lux-dialog.service';
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxFilterSaveDialogComponent } from '../lux-filter-dialog/lux-filter-save-dialog/lux-filter-save-dialog.component';
import { ILuxDialogConfig } from '../../lux-popups/lux-dialog/lux-dialog-model/lux-dialog-config.interface';
import { LuxFilter } from '../lux-filter-base/lux-filter';
import { LuxFilterLoadDialogComponent } from '../lux-filter-dialog/lux-filter-load-dialog/lux-filter-load-dialog.component';
import { LuxFilterItemDirective } from '../lux-filter-base/lux-filter-item.directive';
import { LuxFilterItem } from '../lux-filter-base/lux-filter-item';
import { LuxLookupComboboxComponent } from '../../lux-lookup/lux-lookup-combobox/lux-lookup-combobox.component';
import { LuxFilterFormExtendedComponent } from './lux-filter-form-extended/lux-filter-form-extended.component';

@Component({
  selector: 'lux-filter-form',
  templateUrl: './lux-filter-form.component.html',
  styleUrls: ['./lux-filter-form.component.scss']
})
export class LuxFilterFormComponent implements OnInit, AfterViewInit, OnDestroy {
  dialogConfig: ILuxDialogConfig = {
    width: Math.min(600, window.innerWidth - 50) + 'px',
    height: 'auto',
    panelClass: []
  };

 // @ViewChild('defaultTrigger', { read: ElementRef }) defaultTriggerElRef: ElementRef;
  @ContentChildren(LuxFilterItemDirective, { descendants: true }) formElementes: QueryList<LuxFilterItemDirective>;
  @ContentChild(LuxFilterFormExtendedComponent) extendedOptions: LuxFilterFormExtendedComponent;
  
  _luxFilterValues = {};
  _luxFilterExpanded = false;

  @Input() luxTitle = $localize `:@@luxc.filter.title:Filter`;
  @Input() luxButtonRaised = false;
  @Input() luxButtonFilterLabel = $localize `:@@luxc.filter.filter.btn:Filtern`;
  @Input() luxButtonFilterColor: LuxActionColorType = 'primary';
  @Input() luxButtonResetLabel = $localize `:@@luxc.filter.reset.btn:Zurücksetzen`;
  @Input() luxButtonResetColor: LuxActionColorType = '';
  @Input() luxButtonSaveLabel = $localize `:@@luxc.filter.save.btn:Speichern`;
  @Input() luxButtonSaveColor: LuxActionColorType = '';
  @Input() luxButtonLoadLabel = $localize `:@@luxc.filter.load.btn:Laden`;
  @Input() luxButtonLoadColor: LuxActionColorType = '';
  @Input() luxButtonDialogSave = 'primary';
  @Input() luxButtonDialogLoad = 'primary';
  @Input() luxButtonDialogDelete = 'warn';
  @Input() luxButtonDialogCancel = 'default';
  @Input() luxButtonDialogClose = 'default';
  @Input() luxDefaultFilterMessage = $localize `:@@luxc.filter.defaultFilterMessage:Es wird nach den Standardeinstellungen gefiltert.`;
  @Input() luxShowChips = true;
  @Input() luxStoredFilters: LuxFilter[] = [];
  @Input() luxShowAsCard = false;
  @Input()
  get luxFilterExpanded() {
    return this._luxFilterExpanded;
  }

  set luxFilterExpanded(expanded: boolean) {
    this._luxFilterExpanded = expanded;

    this.luxFilterExpandedChange.emit(expanded);
  }

  @Input()
  get luxFilterValues() {
    return this._luxFilterValues;
  }

  set luxFilterValues(filter: any) {
    this._luxFilterValues = JSON.parse(JSON.stringify(filter));

    if (this.initComplete) {
      this.filterForm.patchValue(this._luxFilterValues);

      this.onFilter();
    }
  }

  @Output() luxOnFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() luxOnSave: EventEmitter<LuxFilter> = new EventEmitter<LuxFilter>();
  @Output() luxOnLoad: EventEmitter<string> = new EventEmitter<string>();
  @Output() luxOnDelete: EventEmitter<LuxFilter> = new EventEmitter<LuxFilter>();
  @Output() luxOnReset: EventEmitter<void> = new EventEmitter<void>();
  @Output() luxFilterExpandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  filterForm: FormGroup;
  subscriptions: Subscription[] = [];
  filterItems: LuxFilterItem[] = [];
  hasSaveAction: boolean;
  hasLoadAction: boolean;
  initComplete = false;
  initFilterValue = null;

  constructor(private formBuilder: FormBuilder, private dialogService: LuxDialogService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initFilterValue = this.luxFilterValues;

    this.filterForm = this.formBuilder.group({});

    if (this.luxOnSave.observers && this.luxOnSave.observers.length > 0) {
      this.hasSaveAction = true;
    }

    if (this.luxOnLoad.observers && this.luxOnLoad.observers.length > 0) {
      this.hasLoadAction = true;
    }
  }

  private updateFilterChips() {
    if (this.initComplete) {
      this.filterItems = [];

      this.formElementes.forEach((formItem) => {
        if (formItem.filterItem && formItem.filterItem.binding && this.filterForm.get(formItem.filterItem.binding)) {
          const value = this.filterForm.get(formItem.filterItem.binding).value;

          if (
            !formItem.filterItem.component.formControl.disabled &&
            formItem.filterItem.defaultValues.findIndex((defaultValue) => defaultValue === value) === -1
          ) {
            if (Array.isArray(value)) {
              let i = 0;
              value.forEach((selected) => {
                const newFilterItem = new LuxFilterItem();
                Object.assign(newFilterItem, formItem.filterItem);
                newFilterItem.value = newFilterItem.renderFn(newFilterItem, selected);
                newFilterItem['index'] = i++;
                this.filterItems.push(newFilterItem);
              });
            } else {
              formItem.filterItem.value = formItem.filterItem.renderFn(formItem.filterItem, value);
              this.filterItems.push(formItem.filterItem);
            }
          }
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.updateContentFilterItems();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  openSaveDialog() {
    const dialogRef = this.dialogService.openComponent(LuxFilterSaveDialogComponent, this.dialogConfig, this);

    this.subscriptions.push(
      dialogRef.dialogClosed.subscribe((result: any) => {
        if (typeof result === 'string') {
          this.onSave(result);
        }
      })
    );
  }

  openLoadDialog() {
    const dialogRef = this.dialogService.openComponent(LuxFilterLoadDialogComponent, this.dialogConfig, this);

    this.subscriptions.push(
      dialogRef.dialogClosed.subscribe((result: any) => {
        if (typeof result === 'string') {
          this.onLoad(result);
        }
      })
    );
  }

  onDelete(filter: LuxFilter) {
    this.luxOnDelete.emit(filter);
  }

  onSave(filterName: string) {
    const newFilter = new LuxFilter();
    newFilter.name = filterName;
    newFilter.data = JSON.parse(JSON.stringify(this.filterForm.value));

    this.onFilter();

    this.luxOnSave.emit(newFilter);
  }

  onLoad(filtername: string) {
    // Hier werden sicherheitshalber alle Filter zurückgesetzt, für den Fall,
    // dass der Aufrufer nicht alle Filterwerte überschreibt. Vielleicht sind auch neue
    // Filterwerte hinzugekommen, etc.
    this.formElementes.forEach((item) => {
      this.filterForm.get(item.filterItem.binding).setValue(item.filterItem.defaultValues[0]);
    });

    // Filter zuklappen.
    this.luxFilterExpanded = false;

    // Hier wird nur ein Event mit dem zu ladenden Filternamen verschickt.
    // Der Empfänger hat jetzt die Aufgabe, die entsprechenden Filterdaten zu laden und
    // über luxFilterValues setzen.
    this.luxOnLoad.emit(filtername);
  }

  onReset() {
    // Hier werden alle Filter zurückgesetzt.
    this.formElementes.forEach((item) => {
      this.filterForm.get(item.filterItem.binding).setValue(item.filterItem.defaultValues[0]);
    });

    // Filtern...
    this.onFilter();

    // Chips aktualisieren
    this.updateFilterChips();

    // Die Interessenten darüber informieren, dass ein Filterreset durchgeführt wurde.
    this.luxOnReset.emit();
  }

  filterChipRemoved(indexRemoved: number) {
    // Ermittle den Filterchip, der entfernt werden soll.
    const removedFilterItem: LuxFilterItem = this.filterItems.splice(indexRemoved, 1)[0];

    if (
      (removedFilterItem.component instanceof LuxSelectComponent || removedFilterItem.component instanceof LuxLookupComboboxComponent) &&
      removedFilterItem.component.luxMultiple
    ) {
      // Fall: Multiselect
      // Kopie erstellen und nicht nur das bestehende Array manipulieren.
      const newSelected = [...this.filterForm.get(removedFilterItem.binding).value];
      // Gelöschten Wert entfernen.
      newSelected.splice(removedFilterItem['index'], 1);
      // Das neue Array in das Formularcontrol setzen.
      this.filterForm.get(removedFilterItem.binding).setValue(newSelected);
    } else {
      // Fall: Einfacher Wert
      this.filterForm.get(removedFilterItem.binding).setValue(removedFilterItem.defaultValues[0]);
    }

    // Filtern...
    this.onFilter();
  }

  @HostListener('document:keydown.shift.enter')
  onShiftEnter() {
    // Alle eventuell noch offenen Popups/Panels der Formularelemente schließen.
    //
    // Beispielszenario:
    // Man navigiert im Filterformular über die Tabulator-Taste in ein
    // Autocomplete-Feld. Automatisch würde sich das Panel mit den vorhandenen
    // Optionen öffnen. Als nächstes könnte man beim geöffneten Optionspanel
    // über die Tastenkombination "Shift + Enter" das Filtern auslösen. Das
    // Filterpanel würde sich nach dem Filtern schließen, aber das Optionspanel
    // des Autocomplete-Feld-Feldes würde stehen bleiben. Dasselbe Problem
    // besteht natürlich auch beim Datepicker, Select und den
    // Lookup-Komponenten. Aus diesem Grund werden hier zuerst alle geöffneten
    // Popups/Panels geschlossen. Im Anschluss wird wie gewohnt gefiltert.
    if (this.luxFilterExpanded) { //sollte nur bei geöffnetem Filterpanel ausgelöst werden
      this.formElementes.forEach((formComponent) => {
        if (formComponent.datepicker) {
          formComponent.datepicker.matDatepicker.close();
        } else if (formComponent.datetimepicker) {
          formComponent.datetimepicker.dateTimeOverlayComponent.close();
        } else if (formComponent.select) {
          formComponent.select.matSelect.close();
        } else if (formComponent.autoComplete) {
          formComponent.autoComplete.matAutoComplete.closePanel();
        } else if (formComponent.autoCompleteLookup) {
          formComponent.autoCompleteLookup.matAutocompleteTrigger.closePanel();
        } else if (formComponent.selectLookup) {
          formComponent.selectLookup.matSelect.close();
        }
      });

      this.onFilter();
      this.cdr.detectChanges();
    }
  }

  onFilter() {
    this.onFilterIntern(true);
  }

  onFilterIntern(changeExpandState: boolean) {
    if (this.filterForm.valid) {
      if (changeExpandState) {
        // Filter zuklappen.
        this.luxFilterExpanded = false;
      }

      // Filterchips aktualisieren.
      this.updateFilterChips();

      // Die Interessenten darüber informieren, dass gefiltert werden soll.
      this.luxOnFilter.emit(JSON.parse(JSON.stringify(this.filterForm.value)));
    } else {
      LuxUtil.showValidationErrors(this.filterForm);
    }
  }

  private updateContentFilterItems() {
    // An dieser Codestelle ist setTimeout nötig, wenn die Inhalte über eine LUX-Layout-Form-Row gesetzt werden.
    // D.h. initial gibt es keine Filteritem, aber dann werden die Filteritems über ngAfterContentInit hinzugefügt.
    setTimeout(() => {
      this.formElementes.forEach((item) => {
        this.filterForm.addControl(item.filterItem.binding, item.filterItem.component.formControl);
      });

      this.filterForm.patchValue(this.luxFilterValues);

      // Der Filter ist jetzt vollständig. D.h. alle Formularelemente sind bekannt,
      // die zugehörigen Controls wurden erzeugt und die Werte gesetzt.
      // Jetzt ist die Initialisierung abgeschlossen und die Filterchips können
      // aktualisiert werden.
      this.initComplete = true;

      // Da die Initialisierung der Komponente verzögert stattfindet,
      // muss noch einmal geprüft werden, ob sich der initiale Filterwert
      // in der Zwischenzeit geändert hat.
      // Wenn sich der Filterwert geändert hat, muss das Filtern ausgelöst werden.
      // Wenn der Filterwert gleichgeblieben ist, müssen nur die Filterchips aktualisiert werden.
      if (this.luxFilterValues !== this.initFilterValue) {
        this.onFilterIntern(false);
      } else {
        this.updateFilterChips();
      }
    });
  }
}
