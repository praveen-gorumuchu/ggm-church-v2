import { Injectable } from '@angular/core';

import { NumberConstant } from '../../shared/constants/number-constant';
import { StringConstant } from '../constants/string-constant';

import { UtilSharedService } from './util-shared.service';
import { FileReaderService } from './file-reader.service';
import { DataTableButtons } from '../models/new/table-headers.model copy';
import { DisplayScreen } from '../models/new/display-screen.model';
import { DailogDataModel } from '../models/new/dialog-data-model';
import { ActionType } from '../models/new/data-table-actions';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  path: any = '../../../assets/json/mock.json';

  constructor(private utilSharedService: UtilSharedService, private fileReaderService: FileReaderService) { }

  sortByDeletionFlag(data: any[]): any[] { return data.sort((a: any, b: any) => a.deletionFlag - b.deletionFlag) }

  setTableStyles(id: string, addClass: string[], removeClass: string[]) {
    const parentId = document.getElementById(id) as HTMLElement;
    const childId = parentId.childNodes[NumberConstant.ZERO] as HTMLElement;
    if (addClass && addClass.length > NumberConstant.ZERO && childId)
      addClass.forEach(ele => childId.classList.add(ele));
    if (removeClass && removeClass.length > NumberConstant.ZERO)
      removeClass.forEach(ele => childId.classList.remove(ele));
  }

  setDialogData(title: string, button: DataTableButtons, icon?: string,
    iconColor = 'primary', screen?: DisplayScreen.TypeEnum, data?: any): DailogDataModel {

    const buttons: DataTableButtons[] = [];
    const cancel: DataTableButtons = {
      name: ActionType.StatusEnum.CANCEL,
      color: '',
    }
    buttons.push(button);
    buttons.push(cancel);
    return { title, icon, iconColor, buttons, screen, data }

  }

  previewDoc(type: DataTableButtons, data: any, selected: boolean) {
    const base64: Uint8Array =
      this.utilSharedService.convertBase64toUnitArray(data.fileData);
    const blob: Blob = new Blob([base64], { type: data.fileType });
    const fileUrl = URL.createObjectURL(blob);
    const previewWindow = window.open(fileUrl, '_blank');
  }

}
