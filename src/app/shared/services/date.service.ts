import { Injectable } from '@angular/core';
import moment from 'moment';
import { NumberConstant } from '../constants/number-constant';
import { StringConstant } from '../constants/string-constant';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  tomorrowDate = moment().clone().add(NumberConstant.ONE, 'days');
  constructor(private datepipe: DatePipe) { }

  addYears(years: number) {
    return moment().clone().add(years, 'years')
  }

  todayDate(date: Date): string {
    return this.datepipe.transform(date, StringConstant.DDMMYYY_FORMAT) as string;
  }

  transformToLocal(date: moment.Moment, format: string): Date | any {
    return this.datepipe.transform(date.toLocaleString(), format)
  }
}
