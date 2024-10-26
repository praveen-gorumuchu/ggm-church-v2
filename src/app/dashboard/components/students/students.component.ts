import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { AttendanceService } from './../../service/attendance.service';
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
import { HttpErrorResponse } from '@angular/common/http';
import { MessageBarService } from '../../../shared/services/message-bar.service';
import { StringConstant } from '../../../shared/constants/string-constant';
import { TableColumnsConstant } from '../../../shared/constants/table-columns.constant';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { AttendanceModel, AttendanceStatusEnum, QuizParticipantStatus } from '../../models/quiz-models/attendance/attendance.model';
import { GenerateIdConst } from '../../../shared/constants/generate-id.constant';
import { DisplayScreen } from '../../../shared/models/new/display-screen.model';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss', '../../dashboard-style.scss']
})
export class StudentsComponent implements OnInit {
  screen = DisplayScreen.TypeEnum.STUDENTS;
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
  attendanceList: AttendanceModel[] = [];
  filteredStudentName!: Observable<StudentModel[]>;
  filteredStudentClass!: Observable<StudentModel[]>;

  @ViewChild(MatAutocompleteTrigger) studentNameAuto!: MatAutocompleteTrigger;
  @ViewChild(MatAutocompleteTrigger) studentClass!: MatAutocompleteTrigger;

  constructor(private router: Router, private loginService: LoginService,
    private studentService: StudentService, private messageBarService: MessageBarService,
    private utilSharedService: UtilSharedService, private fb: FormBuilder,
    private attendanceService: AttendanceService, private localStorageService: LocalStorageService
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
    const existing = this.localStorageService.getData(GenerateIdConst.studentID);
    if (existing && existing.length > 0) {
      this.studentList = this.utilSharedService.alphaNumericSort(existing, TableColumnsConstant.ID);
      this.updateStudentDefaultData();
      this.getFilteredOptions();
    } else {
      this.studentService.getStudentIds().subscribe((res: StudentModelRes) => {
        if (res && res.data && res.data.length > NumberConstant.ZERO) {
          this.studentList = this.utilSharedService.alphaNumericSort(res.data, TableColumnsConstant.ID)
          this.updateStudentDefaultData();
          this.getFilteredOptions();
        }
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.messageBarService.showErorMsgBar(error.error.message);
      });
    }
  }

  updateStudentDefaultData() {
    this.studentList.forEach((student: StudentModel) => {
      if (student && !student.attendance) student.attendance = AttendanceStatusEnum.PENDING
      if (student && !student.quiz) student.quiz = QuizParticipantStatus.NO
    })
  }

  callToDataTable(data: StudentModel[]) {
    this.columns = this.studentService.setDataTableCols();
    this.buttons = this.studentService.setStudentButtons();
    if (this.columns && this.columns.length > NumberConstant.ZERO) {
      this.dataSource = data;
      this.isSearch = true;
      this.setDataForAttendance();
    } else {
      this.isLoading = false;
      this.messageBarService.showErorMsgBar(StringConstant.ERROR_MSG);
    }
  }

  onAttendance() {
    this.isLoading = false;
    this.isSearch = true
    this.columns = this.studentService.setDataTableCols();
    this.buttons = this.studentService.setAttendanceButtons();
    this.dataSource = this.studentList;
    this.setDataForAttendance();
  }


  setDataForAttendance() {
    this.attendanceService.setStudentList(this.dataSource);
    this.attendanceList = this.attendanceService.getAttendance();
  }

  searchData() {
    const classVal = (this.className?.value?.class || '').trim().toLowerCase();
    const nameVal = (this.studentName?.value?.name || '').trim().toLowerCase();

    if (!classVal && !nameVal) {
      this.messageBarService.showErorMsgBar(StringConstant.GLOBAL_RESULT);
      this.callToDataTable(this.studentList);
      return;
    }

    // Filter based on provided values
    const filteredData = this.studentList.filter((data: StudentModel) => {
      const matchesClass = classVal ? data.class.toLowerCase() === classVal : true;
      const matchesName = nameVal ? data.name.toLowerCase() === nameVal : true;

      // Return true only if both criteria match
      return matchesClass && matchesName;
    });

    // Call the method to update the table with the filtered data
    this.callToDataTable(filteredData);
  }


  onRegister() {
    this.router.navigate(['dashboard', 'register-student'])
  }



  actionItems(event: DataTableActions) {
    if (event && event.action === ActionType.StatusEnum.EDIT && event.data &&
      event.data.length > NumberConstant.ZERO) {
    } else if (event && event.action === ActionType.StatusEnum.MARK) {
      this.markAttendance(event.data, true);
    } else if (event && event.action === ActionType.StatusEnum.UN_MARK) {
      this.markAttendance(event.data, false)
    } else if (event && event.action === ActionType.StatusEnum.QUIZ) {
      this.markQuiz(event.data, true);
    }
  }

  markAttendance(data: StudentModel[], flag: boolean): void {
    const currentAttendanceList = this.attendanceService.getAttendance();
    let isUpdated = false;
    data.forEach(student => {
      const attendanceEntry = currentAttendanceList.find(a => a.studentId === student.id);
      if (attendanceEntry) {
        attendanceEntry.attendance = flag;
        isUpdated = true;
        if (flag) student.attendance = AttendanceStatusEnum.PRESENT;
        else student.attendance = AttendanceStatusEnum.ABSENT;
      }
    });

    if (isUpdated && currentAttendanceList && currentAttendanceList.length > 0) {
      this.attendanceService.saveAttendance(currentAttendanceList);
      this.messageBarService.showSuccessMsgBar(StringConstant.ATTENDANCE);
      this.updateStudentData(data);
    }
  }

  markQuiz(data: StudentModel[], flag: boolean) {
    const currentAttendanceList = this.attendanceService.getAttendance();
    let isUpdated = false;
    data.forEach((student: StudentModel) => {
      const attendanceEntry = currentAttendanceList.find(a => a.studentId === student.id);
      if (attendanceEntry) {
        attendanceEntry.quiz = flag;
        isUpdated = true;
        if (flag) student.quiz = QuizParticipantStatus.YES;
      }
    });
    if (isUpdated && currentAttendanceList && currentAttendanceList.length > 0) {
      this.attendanceService.saveAttendance(currentAttendanceList);
      this.messageBarService.showSuccessMsgBar(StringConstant.QUIZ_PARTICIPENT);
      this.updateStudentData(data);
    }
  }

  updateStudentData(data: StudentModel[]) {
    if (data && data.length > NumberConstant.ZERO) {
      this.isLoading = true;
      this.studentList.forEach((student: StudentModel, index: number) => {
        const updatedStudent = data.find(s => s.id === student.id);
        if (updatedStudent) {
          this.studentList[index] = { ...updatedStudent };
        }
      });
      setTimeout(() => {
        this.callToDataTable(this.studentList);
        this.localStorageService.setData(GenerateIdConst.studentID, this.studentList);
        this.isLoading = false;
      })
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
