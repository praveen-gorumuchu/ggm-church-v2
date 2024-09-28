import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { StringConstant } from '../constants/string-constant';
import { NumberConstant } from '../constants/number-constant';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  validationType: any = {
    'course': [Validators.required, Validators.minLength(NumberConstant.FOUR)],
    'fromDate': [Validators.required],
    'toDate': [Validators.required]
  };

  constructor() { }

  resetFormGroup(formGroup: FormGroup) {
    formGroup.untouched;
    formGroup.setErrors(null);
    formGroup.reset();
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.controls[key].setErrors(null);
    });
  }

  resetErrors(formGroup: FormGroup) {
    formGroup.setErrors(null);
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.controls[key].setErrors(null);
    });
  }

  setErrors(ctrl: AbstractControl, min?: number, max?: number, pattern?: string): string {
    const touched = ctrl.touched;
    if (touched && ctrl.hasError(StringConstant.required)) return StringConstant.REUIRED;
    else if (touched && !ctrl.hasError(StringConstant.required) && ctrl.hasError(StringConstant.email))
      return `${StringConstant.INVALID_EMAIL}`
    else if (touched && !ctrl.hasError(StringConstant.required) && ctrl.hasError(StringConstant.pattern))
      return `${StringConstant.INVALID_PATTERN}: ${pattern}`;
    else if (touched && !ctrl.hasError(StringConstant.required) &&
      !ctrl.hasError(StringConstant.pattern) && ctrl.hasError(StringConstant.minlength))
      return `${StringConstant.MIN_LENGTH} ${min}.`
    else if (touched && !ctrl.hasError(StringConstant.required) && !ctrl.hasError(StringConstant.minlength) &&
      !ctrl.hasError(StringConstant.pattern) && !ctrl.hasError(StringConstant.minlength)
      && ctrl.hasError(StringConstant.maxlength)) return `${StringConstant.MAX_LENGTH} ${max}.`

    else return '';
  }

  // Date Validator

  setErrorsForDate(ctrl: AbstractControl, min: string, max: string): string {
    const touched = ctrl && ctrl.touched;
    // const value: any = ctrl.value.format(StringConstant.MOMENT_DDMMMYYY);
    if (touched && ctrl.hasError(StringConstant.required) && !ctrl.hasError(StringConstant.DATE_PICKER_PARSE)) {
      return StringConstant.REUIRED;
    } else if (touched && ctrl.hasError(StringConstant.DATE_PICKER_PARSE)) {
      return `${StringConstant.INVALID_FORMAT}.! ${StringConstant.ALLOWED}: ${StringConstant.MOMENT_DDMMMYYY}`
    } else if (touched && !ctrl.hasError(StringConstant.required) &&
      !ctrl.hasError(StringConstant.DATE_PICKER_PARSE) && ctrl.hasError(StringConstant.MIN_DATE_PCIKER))
      return `${StringConstant.MIN_DATE_ERROR} ${min}`
    else if (touched && !ctrl.hasError(StringConstant.required) && !ctrl.hasError(StringConstant.DATE_PICKER_PARSE) &&
      !ctrl.hasError(StringConstant.MIN_DATE_PCIKER) && ctrl.hasError(StringConstant.MAX_DATE_PCIKER))
      return `${StringConstant.MAX_DATE_ERROR} ${max}`
    else return '';
  }
  setErrorsForDateRange(ctrl: AbstractControl, min: string, max: string, msg?: string) {
    const touched = ctrl && ctrl.touched;
    if (touched && !ctrl.hasError(StringConstant.required) && ctrl.hasError('matDatepickerMax')) {
      return `${msg} ${StringConstant.MAX_DATE_ERROR} ${max}`
    } else if (touched && !ctrl.hasError(StringConstant.required) &&
      !ctrl.hasError('matDatepickerMax') && ctrl.hasError('matDatepickerMin')) {
      return `${msg} ${StringConstant.MIN_DATE_ERROR} ${min}`
    } else if (touched && !ctrl.hasError(StringConstant.required) &&
      !ctrl.hasError('matDatepickerMax') && !ctrl.hasError('matDatepickerMin') &&
      ctrl.hasError('matStartDateInvalid')) {
      return 'Invalid Start Date'
    } else if (touched && !ctrl.hasError(StringConstant.required) &&
      !ctrl.hasError('matDatepickerMax') && !ctrl.hasError('matDatepickerMin') &&
      !ctrl.hasError('matStartDateInvalid') && ctrl.hasError('matEndDateInvalid')) {
      return 'Invalid End Date'
    }
    else return '';
  }
  // Format 24 hours format to 12 Hours Format

  formatTime(value: any) {
    let timeSplit = value.split(':'), hours, minutes, meridian;
    hours = timeSplit[NumberConstant.ZERO];
    minutes = timeSplit[NumberConstant.ONE];
    if (hours > NumberConstant.TWELVE) {
      meridian = StringConstant.PM;
      hours -= NumberConstant.TWELVE;
    } else if (hours < NumberConstant.TWELVE) {
      meridian = StringConstant.AM;
      if (hours == NumberConstant.ZERO) {
        hours = NumberConstant.TWELVE;
      }
    } else {
      meridian = StringConstant.PM;
    }
    return `${hours}:${minutes} ${meridian}`
  }

  // Add Validators
  addValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key)?.setValidators(this.validationType[key]);
      form.get(key)?.updateValueAndValidity();
    }
  }

  // Remove Validators
  removeValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key)?.clearValidators();
      form.get(key)?.updateValueAndValidity();
    }
  }

  format12Hours(timeStr: any) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === NumberConstant.TWELVE) {
      hours = '00';
    }
    if (modifier === StringConstant.PM) {
      hours = parseInt(hours, NumberConstant.TEN) + NumberConstant.TWELVE;
    }
    return `${hours}:${minutes}`;
  };

  ctrlHasError(ctrl: AbstractControl): boolean {
    return ctrl && ctrl.errors && Object.keys(ctrl.errors).length > NumberConstant.ZERO ? true : false;
  }

  getDpValue(value: any, key?: string): any {
    if (value != '' && value !== null && value !== undefined) {
      if (typeof value !== StringConstant.object) return value
      else if (typeof value === StringConstant.object && key && value.hasOwnProperty(key)) return value[key];
    }
    return null
  }


}
