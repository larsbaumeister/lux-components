import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LuxFileInputComponent } from '../../../../modules/lux-form/lux-file/lux-file-input/lux-file-input.component';
import { LuxFilePreviewService } from '../../../../modules/lux-file-preview/lux-file-preview.service';
import { ILuxFileActionConfig } from '../../../../modules/lux-form/lux-file/lux-file-model/lux-file-action-config.interface';
import { LuxFormFileBase } from '../../../../modules/lux-form/lux-form-model/lux-form-file-base.class';
import { LuxSnackbarService } from '../../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { FileExampleComponent } from '../file-example.component';
import { ILuxFileObject } from '../../../../modules/lux-form/lux-file/lux-file-model/lux-file-object.interface';

@Component({
  selector: 'app-file-input-example',
  templateUrl: './file-input-example.component.html'
})
export class FileInputExampleComponent extends FileExampleComponent implements AfterViewInit {
  @ViewChildren(LuxFileInputComponent) fileInputs: QueryList<LuxFileInputComponent>;
  @ViewChild('fileinputexamplewithoutform', { read: LuxFileInputComponent, static: true })
  fileBaseWithoutComponent: LuxFileInputComponent;
  @ViewChild('fileinputexamplewithform', { read: LuxFileInputComponent, static: true })
  fileBaseWithComponent: LuxFileInputComponent;

  placeholder = 'Placeholder';
  clearOnError = true;

  namePrefixAccept = '(OK) ';
  nameSuffixAccept = ` (${new Date().toLocaleDateString()})`;

  namePrefixDecline = '(ERR) ';
  nameSuffixDecline = ` (${new Date().toLocaleDateString()})`;

  customActionConfigs: ILuxFileActionConfig[] = this.createCustomConfigs();
  customActionsConfigsForm: ILuxFileActionConfig[] = this.createCustomConfigs();
  
  labelLongFormat = false;
  
  constructor(fb: FormBuilder, http: HttpClient, snackbar: LuxSnackbarService, filePreviewService: LuxFilePreviewService) {
    super(fb, http, snackbar, filePreviewService);
  }

  getFileComponentWithoutForm(): LuxFormFileBase {
    return this.fileBaseWithoutComponent;
  }

  getFileComponentWithForm(): LuxFormFileBase {
    return this.fileBaseWithComponent;
  }

  onKeepFileWithoutForm(keepFile: boolean) {
    if (keepFile) {
      const fileCopy = {};
      Object.assign(fileCopy, this.selected);
      this.fileBaseWithoutComponent.luxSelectedFiles = fileCopy;
    } else {
      this.fileBaseWithoutComponent.luxSelectedFiles = undefined;
    }
  }

  onKeepFileWithForm(keepFile: boolean) {
    if (keepFile) {
      const fileCopy = {};
      Object.assign(fileCopy, this.fileBaseWithComponent.luxSelectedFiles);
      this.fileBaseWithComponent.luxSelectedFiles = fileCopy;
    } else {
      this.fileBaseWithComponent.luxSelectedFiles = undefined;
    }
  }

  ngAfterViewInit() {
    this.fileComponents = this.fileInputs.toArray();
  }

  onDelete(event: any){
    this.customActionConfigs.forEach(config => config.disabled = true);
  }

  onUpload(event: any) {
    this.customActionConfigs.forEach(config => config.disabled = false);
  }

  private createCustomConfigs(): ILuxFileActionConfig[] {
    const customConfigAccept = {
      disabled: false,
      hidden: false,
      iconName: 'lux-interface-validation-check',
      label: 'Akzeptieren',
      prio: 1,
      onClick: (fileObject: ILuxFileObject) => {
        if (fileObject) {
          customConfigAccept.disabled = true;
          customConfigDecline.disabled = false;
          fileObject.namePrefix = this.namePrefixAccept;
          fileObject.nameSuffix = this.nameSuffixAccept;
        }
      }
    };

    const customConfigDecline = {
      disabled: false,
      hidden: false,
      iconName: 'lux-interface-delete-1',
      label: 'Ablehnen',
      prio: 2,
      onClick: (fileObject: ILuxFileObject) => {
        if (fileObject) {
          customConfigAccept.disabled = false;
          customConfigDecline.disabled = true;
          fileObject.namePrefix = this.namePrefixDecline;
          fileObject.nameSuffix = this.nameSuffixDecline;
        }
      }
    };

    return [customConfigAccept, customConfigDecline];
  }
}
