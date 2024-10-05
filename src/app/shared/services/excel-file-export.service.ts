import { Injectable } from '@angular/core';
import moment from 'moment';
import * as XLSX from 'xlsx';

import { NumberConstant } from '../../shared/constants/number-constant';
import { StringConstant } from '../../shared/constants/string-constant';
import { TableColumnsConstant } from '../../shared/constants/table-columns.constant';

import { FileTypesMapper } from '../mappers/file-type-mapper';
import { ExcelWorkBookData } from '../models/files/excel-workbook-data.model';
import { TableHeaders } from '../models/new/table-headers.model copy';
import { MomentFormats } from '../constants/moment-formats';

@Injectable({
  providedIn: 'root'
})
export class ExcelFileExportService {

  constructor() { }

  excelExport(heading: any, title: any[], jsonData: any[], fileName: string) {
    const titleCol = StringConstant.titleCol;
    const headerRow = title.length + NumberConstant.TWO;
    const jsonRow = headerRow + NumberConstant.ONE;
    const headerCol = StringConstant.A + headerRow;
    const jsonCol = StringConstant.A + jsonRow;
    const sheetName = fileName.length > NumberConstant.THIRTY ? StringConstant.DEFUALT_SHEET : fileName;
    const exportFileName = fileName + StringConstant.underScore + moment(new Date()).format(MomentFormats.DDMMMyyyy) + StringConstant.xlsxExtension;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const colLengths = Object.keys(jsonData[0]).map((k: any) => k.toString().length);
    for (const d of jsonData) {
      Object.values(d).forEach((element: any, index) => {
        if (element != null) {
          const length = element.toString().length
          if (colLengths[index] < length) { colLengths[index] = length; }
        }
      })
    }
    ws["!cols"] = colLengths.map((l) => { return { wch: l + NumberConstant.FIVE, } })
    XLSX.utils.sheet_add_json(ws, title, { skipHeader: true, origin: titleCol })
    XLSX.utils.sheet_add_aoa(ws, heading, { origin: headerCol });
    XLSX.utils.sheet_add_json(ws, jsonData, { origin: jsonCol, skipHeader: true })
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, exportFileName);
  }

  excelOrder(columns: TableHeaders[], xlOrder: string[] = []): string[] {
    columns.forEach((column: TableHeaders) => {
      if (column.key != TableColumnsConstant.SELECT)
        xlOrder.push(column.key)
    });
    return xlOrder;
  }

  getFileHeader(columns: TableHeaders[], header: any[] = []): string[] {
    columns.forEach((column: TableHeaders) => {
      if (column.display != '')
        header.push(column.display);
    });
    return header;
  }

  format(res: any[], col: string) {
    res.forEach(value => {
      this.dateFormat(value, col);
    });
    return res;
  }

  dateFormat(res: any, col: string) {
    for (let key in res) {
      if (key === col)
        res[key] = moment(res[key]).format(MomentFormats.MOMENT_DDMMYYYY);
      res[key] = (res[key] == StringConstant.invalidDate) ? StringConstant.hyphen : res[key]
    }
  }

  generateExcelToBlob(data: ExcelWorkBookData): Blob {
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data.jsonData);
    const headerCols: XLSX.ColInfo[] = data.headers.map((header: string) => {
      const length = header.length < NumberConstant.THREE ? header.length * 2.5 : header.length * 1.5
      return { width: length, alignment: { horizontal: StringConstant.LEFT } };
    })
    ws['!cols'] = headerCols;
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, data.fileName);
    const excelBuffer: any = XLSX.write(wb, {
      bookType:  'xlsx',
      type: 'array'
    });
    const blob: Blob = new Blob([excelBuffer], { type: FileTypesMapper.xlsx });
    return blob
  }

  setDesiredExcelData(data: any[], headers: string[],
    mappers: { [key: string]: string }, fileName: string): ExcelWorkBookData {
    const headerLabels = headers.map((header: string) => mappers[header]);
    const filteredData: any[] = [headerLabels];
    data.map((item: any) => {
      const fileteredItem: any[] = [];
      headers.forEach((header: string) => {
        const desiredItmes = Object.keys(mappers);
        const propName: string = desiredItmes.find(key =>
          mappers[key] === header) || header;
        const value = item[propName];
        fileteredItem.push(value);
      });
      filteredData.push(fileteredItem);
    })
    return {
      headers: headerLabels, jsonData: filteredData, fileName
    }
  }
}
