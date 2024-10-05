import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterContentChecked, AfterViewInit, ChangeDetectorRef,
  Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild
} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

import { NumberConstant } from '../../constants/number-constant';
import { StringConstant } from '../../constants/string-constant';

import { MessageBarService } from '../../services/message-bar.service';
import { UtilSharedService } from '../../services/util-shared.service';

import { DataTableService } from '../../services/data-table.service';
import { DialogComponent } from '../dialog/dialog.component';
import { TableColumnsConstant } from '../../constants/table-columns.constant';
import { DataTableButtons, TableHeaders } from '../../models/new/table-headers.model copy';
import { ActionType, DataTableActions } from '../../models/new/data-table-actions';
import { DisplayScreen } from '../../models/new/display-screen.model';


@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.scss']
})
export class DataTablesComponent implements OnInit, OnChanges, AfterContentChecked, OnDestroy, AfterViewInit {
  dataTableSource = new MatTableDataSource<Element>();
  @Input() dataSource: any;
  @Input() tableCols: TableHeaders[] = [];
  @Input() buttons: DataTableButtons[] = [];
  @Input() isLoading: boolean = false;
  @Input() isSearch: boolean = false;
  @Input() checkbox: boolean = true;
  @Input() pagination: boolean = true;
  @Input() sorting: boolean = true;
  @Output() actionItems = new EventEmitter<DataTableActions>();
  @Input() dataTableId!: HTMLElement;
  @Input() screen!: DisplayScreen.TypeEnum;
  @Input() SelectionData = false;
  @Input() title = StringConstant.SEARCH_RESULT;
  @Input() onlyTable = true;
  paginator!: MatPaginator;
  sort!: MatSort;
  selection = new SelectionModel<any>(true, []);
  @ViewChild('matCheckbox') matCheckbox!: MatCheckbox;
  renderedData: Element[] = [];
  @ViewChild("print") print!: ElementRef;
  formGroup!: FormGroup;
  @ViewChild(MatSort) set matSort(ms: MatSort) { this.sort = ms; this.setDataSourceAttributes(); }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) { this.paginator = mp; this.setDataSourceAttributes(); }

  constructor(private dialog: MatDialog, private router: Router, private fb: FormBuilder,
    private messageBarService: MessageBarService, private cdRef: ChangeDetectorRef,
    private dataTableService: DataTableService, private utilSharedService: UtilSharedService,
  ) { }

  setDataSourceAttributes() {
    if (this.pagination) this.dataTableSource.paginator = this.paginator;
    if (this.sorting) this.dataTableSource.sort = this.sort;
  }

  ngOnInit() {
    this.getDisplayedCols();
    this.dataTableSource.connect().subscribe((row) => {
      this.renderedData = row;
      if (this.renderedData && this.renderedData.length > NumberConstant.ZERO
        && this.selection.selected.length > NumberConstant.ZERO) {
        this.resetCheckBoxValidation();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.getDisplayedCols();
      if (!this.isSearch) this.selection.clear();
    }
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  checkBoxSelection(e: MatCheckboxChange) {
    // this.SelectionData ? this.selectAllCheckBox(e) : this.isMasterDataToggle(e);
    this.isMasterDataToggle(e)
  }

  selectAllCheckBox(e: MatCheckboxChange) {
    this.dataSource.forEach((row: any) => {
      if (e.checked) {
        this.matCheckbox.checked = true;
        if (row.deletionFlag >= NumberConstant.ONE) this.selection.deselect(row);
        else this.selection.select(row);
      } else if (!e.checked) {
        this.selection.deselect(row);
        this.matCheckbox.checked = false;
      }
    });
  }

  get keys() {
    return this.tableCols.map(({ key }) => key);
  }

  showBooleanValue(elt: any, column: any) {
    return column.config.values[`${elt[column.key]}`];
  }

  getValueFromObject(ele: any, col: any) {
    const obj = ele[col.key];
    const val = obj[col.config.key];
    return val
  }

  showTrucatedText(elt: any, column: any, max: number): string {
    const name = elt[column.key];
    const val = this.utilSharedService.shortName(name, max);
    return val ? val : name
  }

  shortName(name: string, print: boolean) {
    return !print ? this.utilSharedService.shortName(name, NumberConstant.FIFTEEN) : name;
  }

  onChangeValue(event: any, row: any) {

  }

  isDisableAction(data: any, action: DataTableButtons): boolean {
    switch (action.screen) {

      default:
        return false;
    }
  }

  prepopulateData() {
    if (this.hasForm && this.dataSource &&
      this.dataSource.length > NumberConstant.ZERO) {
      this.dataSource.forEach((element: any, index: any) => {
        this.tableCols.forEach((item: any) => {
          if (item && item.config && item.config.fb && item.config.dropDown) {
            const formContorl: AbstractControl =
              this.formGroup.get(`${item.config.input}_${index}`) as AbstractControl;
            if (formContorl) {
              formContorl.patchValue(element && element.status)
            }
          }
        })
      });
    }
  }

  createFormGroup() {
    if (this.hasForm && this.dataSource && this.dataSource.length > NumberConstant.ZERO) {
      const formCtrls: any = {};
      this.dataSource.forEach((element: any, index: number) => {
        this.tableCols.forEach((item: any) => {
          if (item && item.config && item.config.fb && item.config.input) {
            formCtrls[`${item.config.input}_${index}`] = new FormControl('') as FormControl;
          }
        })
      });
      this.formGroup = this.fb.group(formCtrls);
    }
  }

  getDisplayedCols() {
    if (Array.isArray(this.dataSource) && this.dataSource && this.dataSource.length > NumberConstant.ZERO) {
      this.dataTableSource.data = this.dataSource;
    } else {
      this.dataTableSource.data = [];
    }
    this.createFormGroup();
    this.prepopulateData();
  }

  isMasterDataToggle(e: MatCheckboxChange) {
    const inActiveItems = this.disabledItems();
    if (this.renderedData.length === inActiveItems.length) {
      this.messageBarService.openMessageBar(StringConstant.IN_ACTIVE_RECORDS);
    };
    this.renderedData.forEach((row: any) => {
      if (e.checked) {
        if (row.deletionFlag >= NumberConstant.ONE) this.selection.deselect(row);
        else this.selection.select(row);
      } else if (!e.checked) this.selection.deselect(row);
    });
    this.resetCheckBoxValidation();
  }

  resetCurrentSelection() {
    const deselectSelectedList: any[] = this.selection.selected;
    deselectSelectedList.forEach((row: any) => {
      if (row) this.selection.deselect(row);
    })
    this.resetCheckBoxValidation();
  }

  disabledItems(): Element[] {
    return this.renderedData.filter((data: any) => data && data.deletionFlag >= NumberConstant.ONE);
  }

  isDisableMaterToggle(): boolean {
    return this.renderedData.length === this.disabledItems().length;
  }

  pageChanged(e: any) { }

  sortData(e: any) { }

  //  reset check box validation on click of pagination and sorting.
  resetCheckBoxValidation() {
    const currentRows = this.renderedData;
    const disabledRows = this.disabledItems();
    const selectedRows: Element[] = [];
    if (currentRows && currentRows.length > NumberConstant.ZERO) {
      currentRows.forEach((data: any, i: number) => {
        if (this.selection.isSelected(data)) selectedRows.push(data);
      });
      if (currentRows.length === disabledRows.length || selectedRows.length === NumberConstant.ZERO) {
        this.matCheckbox.checked = false;
        this.matCheckbox.indeterminate = false;
      } else if (currentRows.length === selectedRows.length ||
        currentRows.length - disabledRows.length === selectedRows.length) {
        this.matCheckbox.checked = true;
        this.matCheckbox.indeterminate = false;
      } else if (selectedRows.length >= NumberConstant.ONE) {
        this.matCheckbox.indeterminate = true;
      }
    };
  }

  isAction(selected: boolean, data: any, type: DataTableButtons) {
    switch (type.name) {
      case ActionType.StatusEnum.DELETE:
        this.onDelete(selected, data);
        break;
      case ActionType.StatusEnum.ALL_PRESENT:
        this.selectAll();
        break;
      case ActionType.StatusEnum.DOWNLOAD:
        this.downloadFile(type, data, selected);
        break;
      case ActionType.StatusEnum.DOWNLOADALL:
        this.downloadFile(type, data, selected);
        break;
      case ActionType.StatusEnum.PREVIEW:
        this.previewFile(selected, data, type);
        break;
        case ActionType.StatusEnum.PRINT:
          this.onPrint(type);
          break;
        case ActionType.StatusEnum.PRINT_ALL:
          this.onPrint(type);
          break;
      default: this.routeToParent(selected, data, type.name);
        break;
    }
  }

  isDisabled(type: DataTableButtons): boolean {
    switch (type.name) {
      case ActionType.StatusEnum.EDIT:
        return this.isDisabledEdit();
      case ActionType.StatusEnum.DELETE:
        return this.isDisabledEdit();
      case ActionType.StatusEnum.VIEW:
        return this.isDisabledEdit();
      case ActionType.StatusEnum.REGISTER:
        return this.isDisabledEdit();
      case ActionType.StatusEnum.DOWNLOAD:
        return this.isDisabledDownload(type);
      case ActionType.StatusEnum.DOWNLOADALL:
        return this.isDisabledDownloadAll(type);
      case ActionType.StatusEnum.PREVIEW:
        return this.isDisabledEdit();
      default:
        return false;
    }
  }

  openDialog(selected: boolean, selectedData: any, dialogData?: any) {
    if (selected) {
      const config: MatDialogConfig = {
        panelClass: [StringConstant.delete],
        width: '360px',
        data: dialogData
      }
      const dialogRef = this.dialog.open(DialogComponent, config);
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result.flag) {
          if (result.type === ActionType.StatusEnum.DELETE) {
            this.selection.clear();
          }
          const data =
            this.setConfigForActionBtn(result.type, selectedData, result.remarks);
          this.actionItems.emit(data);

        }
      });
    }
  }

  onPrint(type: DataTableButtons): void {
    if (type.name === ActionType.StatusEnum.PRINT || ActionType.StatusEnum.PRINT_ALL) {
      this.pagination = false;
      const printId = this.print.nativeElement.attributes[StringConstant.printsectionid].value;
      this.dataTableService.setTableStyles(printId, [StringConstant.border, StringConstant.mt5],
        [StringConstant.boxShadow]);
      if (type.name === ActionType.StatusEnum.PRINT_ALL) {
        this.paginator.pageSize = this.dataSource.length;
      }
      setTimeout(() => {
        this.print.nativeElement.click();
        this.print.nativeElement.disbale = true;
        this.pagination = true;
        this.dataTableSource.paginator = this.paginator;
        if (this.paginator && this.paginator !== undefined) this.paginator.pageSize = NumberConstant.FIVE;
        this.dataTableService.setTableStyles(printId, [StringConstant.boxShadow],
          [StringConstant.border, StringConstant.mt5]);
      });
      const event = this.print.nativeElement.addEventListener(StringConstant.click, (event: Event) => {
        event.stopPropagation();
        event.preventDefault();
      });
    }
  }

  isSelectedCheckBox(e: MatCheckboxChange, slectedRow: any, selection: SelectionModel<any>) {
    const inActive = slectedRow.deletionFlag >= NumberConstant.ONE;
    if (!inActive) {
      selection.toggle(slectedRow);
    }
    this.resetCheckBoxValidation();
  }

  isClikdeRow(slectedRow: any, selection: SelectionModel<any>) {
    // const inActive = slectedRow.deletionFlag >= NumberConstant.ONE;
    // if (!inActive) {
    //   selection.toggle(slectedRow);
    // }
    // this.resetCheckBoxValidation();
  }

  ineerTable(data: any) { }

  previewFile(selected: boolean, data: any, type: DataTableButtons) {
    this.dataTableService.previewDoc(type, data[NumberConstant.ZERO], selected);
    this.resetCurrentSelection();
  }

  isDisabledEdit(): boolean {
    let disbale = true;
    disbale = this.selectedRowLen <= NumberConstant.ZERO ? true : false
    return disbale;
  }

  isDisabledDownload(type: DataTableButtons): boolean {
    let disbale = true;
    disbale = this.selectedRowLen === NumberConstant.ONE ? false : true
    return disbale;

  }

  isDisabledDownloadAll(type: DataTableButtons): boolean {
    return false
  }

  get selectedRowLen(): number {
    return this.selection.selected.length;
  }

  isDisabledDelete(): boolean {
    return this.selectedRowLen === NumberConstant.ZERO;
  }

  startView(element: any) {
    const selectedData = this.setConfigForActionBtn(ActionType.StatusEnum.ASSESSMENT_START, element);
    this.actionItems.emit(selectedData);
    this.actionItems.emit(element);
  }

  onDelete(selected: boolean, data: any) {

  }

  downloadFile(type: DataTableButtons, data: any, selected: boolean) {
    this.fileDownload(data);
    this.resetCurrentSelection();
  }




  fileDownload(data: any) {
    if (data) {
      for (let record of data) {
        setTimeout(() => this.docDownload(record), NumberConstant.FIVE_THOUSAND);
      }
    }
  }

  docDownload(data: any) {
    const base64: Uint8Array =
      this.utilSharedService.convertBase64toUnitArray(data.fileData);
    const blob: any = new Blob([base64], { type: data.fileType });
    blob['name'] = data.fileName;
    saveAs(blob);
  }

  selectAll() {
    this.dataSource.forEach((row: any) => {
      this.selection.select(row);
    });
    this.matCheckbox.checked = true;
  }

  routeToParent(selected: boolean, data: any, action: ActionType.StatusEnum) {
    const selectedData = this.setConfigForActionBtn(action, data);
    this.actionItems.emit(selectedData);
  }

  setConfigForActionBtn(action: ActionType.StatusEnum, data: [],
    deletedRemarks?: string): DataTableActions {
    return { action, data, deletedRemarks }
  }

  get hasForm(): boolean {
    return this.tableCols.some((col: any) => col && col.config && col.config.fb);
  }

  resetData() {
    this.dataTableSource.data = [];
    this.dataTableSource.paginator = null,
      this.dataTableSource.sort = null,
      this.dataSource = [];
  }

  ngOnDestroy() {
    this.resetData();
  }

}



