import { NumberConstant } from './../../constants/number-constant';

import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { DailogDataModel } from '../../models/new/dialog-data-model';
import { StringConstant } from '../../constants/string-constant';
import { DataTableButtons } from '../../models/new/table-headers.model copy';
import { ActionType } from '../../models/new/data-table-actions';
import { PatternConstant } from '../../constants/patterns.constant';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  formGroup: FormGroup;
  panelOpenState = false;
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DailogDataModel, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      remarks: ['', [Validators.required, Validators.minLength(3), 
        Validators.maxLength(256), Validators.pattern(PatternConstant.ALPHA_NUMERIC_SPE_CAHRS)]]
    })
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  get remarks(): AbstractControl {
    return this.formGroup.get('remarks') as AbstractControl;
  }

  get setErrorsForRemarks(): string {
    const touched = this.remarks.touched;
    if (touched && this.remarks.hasError('required')) {
      return StringConstant.REUIRED
    } else if (touched && !this.remarks.hasError(StringConstant.required) && this.remarks.hasError(StringConstant.pattern)) {
      return `${StringConstant.INVALID_PATTERN}`;
    } else if (touched && !this.remarks.hasError('required') && this.remarks.hasError('minlength')) {
      return 'Invalid Remarks. Minimum Remarks cannot be less than 3 characters.';
    } else if (touched && !this.remarks.hasError('required') && !this.remarks.hasError('minlength') && this.remarks.hasError('maxlength')) {
      return `${StringConstant.MAX_LENGTH}250 Excced`;
    } else return '';
  }


  onSubmit(type: DataTableButtons) {
    if (this.formGroup.valid) {
      this.dialogRef.close({
        type: type.name, flag: true, remarks: this.remarks.value
      });
    }
  }

  onAction(type: DataTableButtons) {
    switch (type.name) {
      case ActionType.StatusEnum.DELETE:
        this, this.onSubmit(type);
        break;
      case ActionType.StatusEnum.WITHDRAW:
        this, this.onSubmit(type);
        break;
      case ActionType.StatusEnum.UPDATE:
        this.onSubmit(type);
        break;
      case ActionType.StatusEnum.CANCEL:
        this.close();
        break;
    }
  }

  isDisable(type: DataTableButtons): boolean {
    switch (type.name) {
      case ActionType.StatusEnum.DELETE:
        return this.inValidForm();
      case ActionType.StatusEnum.WITHDRAW:
        return this.inValidForm();
      default:
        return false;
    }
  }

  inValidForm(): boolean {
    return this.formGroup.invalid ? true : false;
  }

}

