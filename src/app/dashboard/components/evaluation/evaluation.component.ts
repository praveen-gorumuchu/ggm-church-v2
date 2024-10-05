import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../shared/services/login.service';
import { MessageBarService } from '../../../shared/services/message-bar.service';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { UtilSharedService } from '../../../shared/services/util-shared.service';
import { StudentService } from '../../service/student.service';
import { ActionType, DataTableActions } from '../../../shared/models/new/data-table-actions';
import { NumberConstant } from '../../../shared/constants/number-constant';
import { StudentModel, StudentModelRes } from '../../models/students/student-list.model';
import { TableColumnsConstant } from '../../../shared/constants/table-columns.constant';
import { HttpErrorResponse } from '@angular/common/http';
import { StringConstant } from '../../../shared/constants/string-constant';
import { DataTableButtons, TableHeaders } from '../../../shared/models/new/table-headers.model copy';
import { Observable } from 'rxjs';
import { UserRoleEnum } from '../../../shared/models/user-data/uder-list.model';
import { QuizResult } from '../../../play-ground/model/student-history.model';
import { StorageKeyConstant } from '../../../shared/constants/storage-keys.constant';
import { PageTitleConstant } from '../../../shared/constants/page-title.constant';
import { TitleConstant } from '../../../shared/constants/title.constant';
import { ExcelFileExportService } from '../../../shared/services/excel-file-export.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.scss'
})
export class EvaluationComponent {

  formGroup!: FormGroup;
  columns: TableHeaders[] = [];
  dataSource: QuizResult[] = [];
  buttons: DataTableButtons[] = [];
  studentList: StudentModel[] = [];
  quizResult: QuizResult[] = [];
  titles = PageTitleConstant;
  isLoading: boolean = false;

  filteredRank!: Observable<QuizResult[]>;
  filteredPercentage!: Observable<QuizResult[]>;
  filteredStudentName!: Observable<StudentModel[]>;
  filteredStudentClass!: Observable<StudentModel[]>;

  excelOrder: string[] = [];
  fileHeader: string[][] = [];

  isLoadingSpin: boolean = false;
  isSearch: boolean = false;
  userRole!: UserRoleEnum;
  reportData: any;

  constructor(private router: Router, private loginService: LoginService,
    private studentService: StudentService, private messageBarService: MessageBarService,
    private utilSharedService: UtilSharedService, private fb: FormBuilder,
    private localStorageService: LocalStorageService, private excelFileExportService: ExcelFileExportService
  ) {
    this.formGroup = this.createForm();
    this.userRole = this.loginService.loginUser.role;
    this.getStudents();
    this.getQuizResult();
  }

  ngOnInit(): void {
    if (this.studentList && this.studentList.length > 0) {
      this.getFilteredOptions();
    }
  }


  getFilteredOptions() {
    this.filteredStudentName = this.utilSharedService.filteredDataComesFirst(
      this.studentName, this.studentList, TableColumnsConstant.name, true, true);

    this.filteredStudentClass =
      this.utilSharedService.filteredDataComesFirst(this.studentClass, this.studentList,
        TableColumnsConstant.class, true, true, true);

    this.filteredRank = this.utilSharedService.filteredDataComesFirst(this.studentRank,
      this.quizResult, TableColumnsConstant.rank, true, true, true);

    this.filteredPercentage = this.utilSharedService.filteredDataComesFirst(this.studentPercentage,
      this.quizResult, TableColumnsConstant.percentage, true, true, true);
  }


  onSumbit() {
    this.isSearch = true;
    this.isLoading = true;
    this.dataSource = [];
    this.searchData();
  }

  onClear() {
    this.formGroup.reset();
    this.dataSource = [];
  }

  displayStudentName(student: StudentModel): string {
    return student && student.name ? student.name : '';
  }

  displayStudentClass(student: StudentModel): string {
    return student && student.class ? student.class : '';
  }

  displayStudentRank(student: QuizResult): string {
    return student && student.rank ? String(student.rank) : ''
  }

  displayStudentPercentage(student: QuizResult): string {
    return student && student.percentage ? String(student.percentage) : ''
  }

  onNameSelected(event: any) { }

  onClassSelected(event: any) { }

  getStudents() {
    this.isLoadingSpin = true;
    this.studentService.getStudentIds().subscribe((res: StudentModelRes) => {
      if (res && res.data && res.data.length > NumberConstant.ZERO) {
        this.studentList = this.utilSharedService.alphaNumericSort(res.data, TableColumnsConstant.ID)
        this.getFilteredOptions();
        this.getQuizResult()
        this.isLoadingSpin = false
      }
    }, (error: HttpErrorResponse) => {
      this.isLoadingSpin = false;
      this.messageBarService.showErorMsgBar(error.error.message);
    });
  }

  getQuizResult() {
    const localData: QuizResult[] = this.localStorageService.getData(StorageKeyConstant.quiz_result);
    if (localData && localData.length > NumberConstant.ZERO) {
      this.quizResult = localData;
    }
  }

  callToDataTable(data: QuizResult[]) {
    this.columns = this.studentService.setQuizResultTableCols();
    this.buttons = this.studentService.setDataTableButtons();
    if (this.columns && this.columns.length > NumberConstant.ZERO) {
      this.dataSource = data;
      console.log(this.columns, this.dataSource)
      this.isSearch = true;
    } else {
      this.messageBarService.showErorMsgBar(StringConstant.ERROR_MSG);
    }
    this.isLoading = false;
  }


  searchData() {
    const classVal = (this.studentClass?.value?.class || '').trim().toLowerCase();
    const nameVal = (this.studentName?.value?.name || '').trim().toLowerCase();
    const rank = this.studentRank?.value?.rank || null;
    const percentage = this.studentPercentage?.value?.percentage || null;

    // Check if all the fields are empty
    if (!rank && !nameVal && !classVal && !percentage) {
      this.messageBarService.showErorMsgBar(StringConstant.GLOBAL_RESULT);
      this.callToDataTable(this.quizResult);
      return;
    }

    const filteredData = this.quizResult.filter((data: QuizResult) => {
      const matchClass = classVal ? data.class.toLowerCase() === classVal : true;
      const matchPercentage = percentage !== null ? data.percentage === percentage : true;
      const matchRank = rank !== null ? data.rank === rank : true;
      const matchesName = nameVal ? data.studentName.toLowerCase() === nameVal : true;

      return matchesName && matchRank && matchPercentage && matchClass;
    });

    this.isLoading = false;
    this.callToDataTable(filteredData);
  }



  actionItems(event: DataTableActions) {
    if (event && event.action === ActionType.StatusEnum.EDIT && event.data &&
      event.data.length > NumberConstant.ZERO) {
    } else if (event && event.action === ActionType.StatusEnum.DELETE && event.data &&
      event.data.length > NumberConstant.ZERO) {
      const remarks = event.deletedRemarks ? event.deletedRemarks : '';

    }else if (event && event.action == ActionType.StatusEnum.EXCEL) {
      this.reset();
      this.excelOrder = this.excelFileExportService.excelOrder(this.studentService.setQuizResultTableCols());
      this.fileHeader.push(this.excelFileExportService.getFileHeader(this.studentService.setQuizResultTableCols()));
      this.exportExcel();
    } 
  }

  exportExcel() {
    this.reportData = JSON.parse(JSON.stringify(this.dataSource, this.excelOrder));
    const fileName = StringConstant.quizResult;
    const title = [{ title: fileName }];
    this.excelFileExportService.excelExport(this.fileHeader, title, this.reportData, fileName);
  }

  reset() {
    this.excelOrder = [];
    this.fileHeader = [];
  }

  get studentName(): AbstractControl {
    return this.formGroup.get('studentName') as AbstractControl
  }

  get studentClass(): AbstractControl {
    return this.formGroup.get('studentClass') as AbstractControl
  }

  get studentRank(): AbstractControl {
    return this.formGroup.get('studentRank') as AbstractControl
  }

  get studentPercentage(): AbstractControl {
    return this.formGroup.get('studentPercentage') as AbstractControl
  }

  createForm() {
    return this.fb.group({
      studentName: [''],
      studentClass: [''],
      studentRank: [null],
      studentPercentage: [null]
    })
  }

  ngOnDestroy(): void {


  }
}
