import { ICustomCSSConfig } from '../../../modules/lux-common/lux-table/lux-table-custom-css-config.interface';
import { ColumnConfig } from './column-config';

export abstract class TableExampleBaseClass {
  pageSizeOptions = [
    { label: '[5, 10, 25, 50]', value: [5, 10, 25, 50] },
    { label: '[10, 20, 30, 40]', value: [10, 20, 30, 40] },
    { label: '[25, 50, 75, 100, 200]', value: [25, 50, 75, 100, 200] }
  ];
  mediaQueryOptions = ['xs', 'sm', 'md', 'lg', 'xl'];
  columnWidthOptions = [
    { label: '[5%, 20%, 30%, 35%, 10%]', value: [5, 20, 30, 35, 10] },
    { label: '[20%, 20%, 20%, 20%, 20%]', value: [20, 20, 20, 20, 20] },
    { label: '[10%, 20%, 50%, 10%, 10%]', value: [10, 20, 50, 10, 10] }
  ];
  tableCSS: ICustomCSSConfig[] = [
    {
      class: 'demo-year-2017',
      check: (element) => element.date.getFullYear() === 2017
    },
    {
      class: 'demo-year-2018',
      check: (element) => element.date.getFullYear() === 2018
    }
  ];
  filter = false;
  filterText = 'Filter hier eingeben';
  noDataText = 'Keine Daten vorhanden';
  pagination = true;
  pageSize = 5;
  pageSizeOption = this.pageSizeOptions[0].value;
  autoPagination = true;
  cssClass: ICustomCSSConfig[] = [];
  pagerDisabled = false;
  pagerTooltip = '';
  pagerFirstLastButton = true;
  columnWidthOption = this.columnWidthOptions[1].value;
  multiSelect = true;
  multiSelectOnlyCheckboxClick = true;
  multiSelectDisabledPropertyActive = false;
  multiSelectDisabledProperty = 'disabled';
  calculateProportions = false;
  minWidthPx = -1;
  tableHeightPx = 500;
  hideBorders = false;
  selected: Set<any> = new Set();
  nameConfig: ColumnConfig = new ColumnConfig({ label: 'Name', sticky: false });
  symbolConfig: ColumnConfig = new ColumnConfig({ label: 'Symbol' });
  dateConfig: ColumnConfig = new ColumnConfig({ label: 'Datum', sticky: false });
  columnConfigs = [this.nameConfig, this.symbolConfig, this.dateConfig];

  abstract getDataArr(): any[];

  compareFn(o1: any, o2: any) {
    return o1.name === o2.name;
  }

  pickPageSize(selected: any) {
    return selected ? selected.value : selected;
  }

  pickColWidth(selected: any) {
    return selected ? selected.value : selected;
  }

  preselect() {
    const newSelected = new Set();
    newSelected.add({ name: 'Hydrogen', symbol: 'H', date: new Date(2017, 11, 24), disabled: false  });
    newSelected.add({ name: 'Helium', symbol: 'He', date: new Date(2017, 11, 22), disabled: false  });
    newSelected.add({ name: 'Lithium', symbol: 'Li', date: new Date(2018, 11, 21), disabled: false  });
    newSelected.add({ name: 'Beryllium', symbol: 'Be', date: new Date(2018, 11, 18), disabled: false  });
    newSelected.add({ name: 'Boron', symbol: 'B', date: new Date(2018, 10, 24), disabled: false  });

    this.selected = newSelected;
  }
}
