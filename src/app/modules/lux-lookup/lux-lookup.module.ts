import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LuxLookupComboboxComponent } from './lux-lookup-combobox/lux-lookup-combobox.component';
import { LuxDirectivesModule } from '../lux-directives/lux-directives.module';
import { LuxLookupAutocompleteComponent } from './lux-lookup-autocomplete/lux-lookup-autocomplete.component';
import { LuxFormModule } from '../lux-form/lux-form.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LuxLookupLabelComponent } from './lux-lookup-label/lux-lookup-label.component';
import { LuxComponentsConfigModule } from '../lux-components-config/lux-components-config.module';
import { LuxLookupAutocompleteAcComponent } from './lux-lookup-autocomplete-ac/lux-lookup-autocomplete-ac.component';
import { LuxLookupComboboxAcComponent } from './lux-lookup-combobox-ac/lux-lookup-combobox-ac.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    LuxDirectivesModule,
    LuxFormModule,
    MatAutocompleteModule,
    MatInputModule,
    FlexLayoutModule,
    LuxComponentsConfigModule
  ],
  declarations: [LuxLookupComboboxComponent, LuxLookupAutocompleteComponent, LuxLookupLabelComponent, LuxLookupAutocompleteAcComponent, LuxLookupComboboxAcComponent],
  providers: [HttpClient],
  exports: [LuxLookupComboboxComponent, LuxLookupAutocompleteComponent, LuxLookupLabelComponent, LuxLookupAutocompleteAcComponent, LuxLookupComboboxAcComponent]
})
export class LuxLookupModule {}
