import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { StringConstant } from '../constants/string-constant';
import { NumberConstant } from './../constants/number-constant';

@Injectable({
  providedIn: 'root'
})
export class MessageBarService {

  constructor(private _snackBar: MatSnackBar) { }

  openMessageBar(message: string, config?: MatSnackBarConfig) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: config && config.horizontalPosition ? config?.horizontalPosition : 'center',
      verticalPosition: config && config.verticalPosition ? config.verticalPosition : 'top',
      duration: config && config.duration ? config.duration : 100000000,
      data: config && config.data ? config.data : undefined,
      panelClass: config && config.panelClass ? config.panelClass : ''
    });
  }


  showErorMsgBar(msg: string) {
    const config: MatSnackBarConfig = { panelClass: [StringConstant.bg_error, StringConstant.w_100] };
    this.openMessageBar(msg && msg != '' ? msg : StringConstant.ERROR_MSG, config);
  }

  showSuccessMsgBar(msg: string) {
    const config: MatSnackBarConfig = { panelClass: [StringConstant.bg_success, StringConstant.w_100] };
    this.openMessageBar(msg, config);
  }

  dismissMessageBar() {
    if (this._snackBar) this._snackBar.dismiss();
  }

}
