import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DailogDataModel } from '../../constants/dailog-constant';
import { DataTableButtons } from '../../models/new/table-headers.model copy';

@Component({
  selector: 'app-mat-dailog',
  templateUrl: './mat-dailog.component.html',
  styleUrl: './mat-dailog.component.scss'
})
export class MatDailogComponent {
  constructor(public dialogRef: MatDialogRef<MatDailogComponent>, @Inject(MAT_DIALOG_DATA)
  public data: DailogDataModel) {

  }

  onButtonClick(button: DataTableButtons): void {
    this.dialogRef.close(button);
  }


}
