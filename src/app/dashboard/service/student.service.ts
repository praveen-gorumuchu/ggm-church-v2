import { AttendanceModel } from './../models/quiz-models/attendance/attendance.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EndPointUrlConst } from '../../shared/constants/end-point-url.constant';
import { StudentModel, StudentModelRes } from '../models/students/student-list.model';
import { DataTableButtons, TableHeaders } from '../../shared/models/new/table-headers.model copy';
import { TableColumnsConstant } from '../../shared/constants/table-columns.constant';
import { DataTableHeaderMapper } from '../../shared/mappers/data-table-mapper';
import { StringConstant } from '../../shared/constants/string-constant';
import { ActionType } from '../../shared/models/new/data-table-actions';
import { IconConstant } from '../../shared/constants/icon.constant';
import { MomentFormats } from '../../shared/constants/moment-formats';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentIds(): Observable<StudentModelRes> {
    return this.http.get<StudentModelRes>(`${environment.baseUrl}/${EndPointUrlConst.getStudent}`);
  }


  setStudentButtons(): DataTableButtons[] {
    return [
      {
        name: ActionType.StatusEnum.QUIZ,
        color: 'warn',
        icon: IconConstant.quiz,
        disable: false
      },
       {
        name: ActionType.StatusEnum.MARK,
        color: 'primary',
        icon: IconConstant.done_all,
        disable: false
      },
      {
        name: ActionType.StatusEnum.UN_MARK,
        color: 'warn',
        icon: IconConstant.remove_done,
        disable: false
      },
      {
        name: ActionType.StatusEnum.EDIT,
        color: 'primary',
        icon: 'edit',
        disable: false
      },

    ]
  }

  setAttendanceButtons(): DataTableButtons[] {
    return [
      {
        name: ActionType.StatusEnum.MARK,
        color: 'primary',
        // icon: 'edit',
        disable: false
      },
      {
        name: ActionType.StatusEnum.UN_MARK,
        color: 'warn',
        // icon: StringConstant.delete,
        disable: false
      },

    ]
  }

  setDataTableButtons(): DataTableButtons[] {
    return [

      {
        name: ActionType.StatusEnum.EXCEL,
        icon: IconConstant.download,
        color: 'primary'
      },
      {
        name: ActionType.StatusEnum.PRINT_ALL,
        color: 'accent',
        icon: IconConstant.download,
        disable: false,
        print: true
      },
      {
        name: ActionType.StatusEnum.EDIT,
        color: 'primary',
        icon: 'edit',
        disable: false
      },
      {
        name: ActionType.StatusEnum.DELETE,
        color: 'warn',
        icon: StringConstant.delete,
        disable: false
      },

    ]
  }

  setDataTableCols(): TableHeaders[] {
    return [
      { key: TableColumnsConstant.SELECT, display: '' },
      { key: TableColumnsConstant.ID, display: DataTableHeaderMapper.std_id },
      { key: TableColumnsConstant.name, display: DataTableHeaderMapper.name },
      {
        key: TableColumnsConstant.class, display: DataTableHeaderMapper.class
      },
      { key: TableColumnsConstant.CREATED_BY, display: DataTableHeaderMapper.createdBy },
      {
        key: TableColumnsConstant.CREATED_DATE, display: DataTableHeaderMapper.creationDate,
        config: { isDate: true, format: MomentFormats.DDMMYYY_FORMAT }
      },
      {
        key: TableColumnsConstant.age, display: DataTableHeaderMapper.age
      },
      {
        key: TableColumnsConstant.phoneNum, display: DataTableHeaderMapper.phoneNum
      },
    ];
  }


  setQuizResultTableCols(): TableHeaders[] {
    return [
      { key: TableColumnsConstant.SELECT, display: '' },
      { key: TableColumnsConstant.studentId, display: DataTableHeaderMapper.std_id },
      { key: TableColumnsConstant.studentName, display: DataTableHeaderMapper.name },
      {
        key: TableColumnsConstant.rank, display: DataTableHeaderMapper.rank
      },
      {
        key: TableColumnsConstant.percentage, display: DataTableHeaderMapper.percentage
      },
      {
        key: TableColumnsConstant.correctAnswers, display: DataTableHeaderMapper.correctAnswers
      },
      { key: TableColumnsConstant.wrongAnswers, display: DataTableHeaderMapper.wrongAnswers },
      {
        key: TableColumnsConstant.totalQuestions, display: DataTableHeaderMapper.totalQuestions
      },
      {
        key: TableColumnsConstant.organisedBy, display: DataTableHeaderMapper.organisedBy
      },
      {
        key: TableColumnsConstant.CREATED_DATE, display: DataTableHeaderMapper.creationDate,
        config: { isDate: true, format: MomentFormats.DDMMYYY_FORMAT }
      },
    ];
  }

  setLeaderBoardHeaders(): TableHeaders[] {
    return [
      {
        key: TableColumnsConstant.rank, display: DataTableHeaderMapper.rank,
        config: {
          icon: true, iconName: IconConstant.military_tech
        }
      },
      { key: TableColumnsConstant.studentName, display: DataTableHeaderMapper.name },
      { key: TableColumnsConstant.score, display: DataTableHeaderMapper.score },
      { key: TableColumnsConstant.percentage, display: DataTableHeaderMapper.percentage },
    ]
  }


  availableStudents(studentList: StudentModel[], attendance: AttendanceModel[]): StudentModel[] {
    return studentList.filter(student => {
        const attendanceEntry = attendance.find(a => a.studentId === student.id);
        return attendanceEntry ? attendanceEntry.quiz : false; 
    });
}


}
