import { UtilSharedService } from './../../../shared/services/util-shared.service';
import { SharedService } from './../../../shared/services/shared.service';
import { StudentService } from './../../service/student.service';
import { LoginService } from './../../../shared/services/login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardTitles } from '../../constants/dashboard-title.constant';
import { Router } from '@angular/router';
import { UserInfo, UserRoleEnum } from '../../../shared/models/user-data/uder-list.model';
import { DataTableButtons, TableHeaders } from '../../../shared/models/new/table-headers.model copy';
import { ActionType, DataTableActions } from '../../../shared/models/new/data-table-actions';
import { NumberConstant } from '../../../shared/constants/number-constant';
import { StudentModel, StudentModelRes } from '../../models/students/student-list.model';
import { Z } from '@angular/cdk/keycodes';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageBarService } from '../../../shared/services/message-bar.service';
import { StringConstant } from '../../../shared/constants/string-constant';
import { TableColumnsConstant } from '../../../shared/constants/table-columns.constant';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss', '../../dashboard-style.scss']
})
export class StudentsComponent implements OnInit {
  titles = DashboardTitles;
  formGroup!: FormGroup;
  userRole!: UserRoleEnum;
  userRoleEnum = UserRoleEnum;
  isSearch: boolean = false;
  isLoading: boolean = false;
  isLoadingSpin: boolean = false;
  columns: TableHeaders[] = [];
  dataSource: any[] = [];
  buttons: DataTableButtons[] = [];
  studentList: StudentModel[] = [];
  filteredStudentName!: Observable<StudentModel[]>;
  filteredStudentClass!: Observable<StudentModel[]>;

  @ViewChild(MatAutocompleteTrigger) studentNameAuto!: MatAutocompleteTrigger;
  @ViewChild(MatAutocompleteTrigger) studentClass!: MatAutocompleteTrigger;

  constructor(private router: Router, private loginService: LoginService,
    private studentService: StudentService, private messageBarService: MessageBarService,
    private utilSharedService: UtilSharedService, private fb: FormBuilder
  ) {
    this.formGroup = this.createForm();
    this.userRole = this.loginService.loginUser.role;
    this.getStudents();
  }

  ngOnInit(): void {
      this.getFilteredOptions();
  }


  getFilteredOptions() {
    this.filteredStudentName = this.utilSharedService.filteredDataComesFirst(
      this.studentName, this.studentList, TableColumnsConstant.name, true, true);
      
    this.filteredStudentClass =
      this.utilSharedService.filteredDataComesFirst(this.className, this.studentList,
        TableColumnsConstant.class, true, true);
   
  }


  onSumbit() {
    this.isSearch = true;
    this.dataSource = [];
    this.searchData();
  }

  onClear() {
    this.formGroup.reset();
    // this.isSearch = false;
    this.dataSource = [];
  }

  displayStudentName(student: StudentModel): string {
    return student && student.name ? student.name : '';
  }

  displayStudentClass(student: StudentModel): string {
    return student && student.class ? student.class : '';
  }

  onNameSelected(event: any) { }

  onClassSelected(event: any) { }

  getStudents() {
    this.studentService.getStudentIds().subscribe((res: StudentModelRes) => {
      if (res && res.data && res.data.length > NumberConstant.ZERO) {
        this.studentList = res.data.sort((a: any, b: any) => a['id'] - b['id']);
        this.getFilteredOptions();
      }
    }, (error: HttpErrorResponse) => {
      this.isLoading = false;
      this.messageBarService.showErorMsgBar(error.error.message);
    });
  }

  callToDataTable(data: StudentModel[]) {
    this.columns = this.studentService.setDataTableCols();
    this.buttons = this.studentService.setDataTableButtons();
    if (this.columns && this.columns.length > NumberConstant.ZERO) {
      this.dataSource = data;
      this.isSearch = true
    } else {
      this.isLoading = false;
      this.messageBarService.showErorMsgBar(StringConstant.ERROR_MSG);
    }
  }


  searchData() {
    const classVal = this.className.value?.class;
    const name = this.studentName.value?.name;
    const filetereData = this.studentList.filter((data: StudentModel) => {
      if (classVal && classVal && classVal !== '' && name !== '') {
        return data.class === classVal && data.name === name
      } else if (classVal && classVal !== '') return data.class === classVal
      else if (name && name !== '') return data.name === name;
      else return [];
    });
    this.callToDataTable(filetereData);
  }

  onRegister() {
    this.router.navigate(['dashboard', 'register-student'])
  }



  actionItems(event: DataTableActions) {
    if (event && event.action === ActionType.StatusEnum.EDIT && event.data &&
      event.data.length > NumberConstant.ZERO) {
    }
    if (event && event.action === ActionType.StatusEnum.DELETE && event.data &&
      event.data.length > NumberConstant.ZERO) {
      const remarks = event.deletedRemarks ? event.deletedRemarks : '';

    }
  }

  get studentName(): AbstractControl {
    return this.formGroup.get('name') as AbstractControl
  }

  get className(): AbstractControl {
    return this.formGroup.get('className') as AbstractControl
  }

  createForm() {
    return this.fb.group({
      name: [''],
      className: ['']
    })
  }

  ngOnDestroy(): void {


  }
}
