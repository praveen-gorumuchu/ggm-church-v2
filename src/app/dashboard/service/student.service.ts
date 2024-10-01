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


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentIds(): Observable<StudentModelRes> {
    return this.http.get<StudentModelRes>(`${environment.baseUrl}/${EndPointUrlConst.getStudent}`);
  }

  setDataTableButtons(): DataTableButtons[] {
    return [
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
      { key: TableColumnsConstant.ID, display: DataTableHeaderMapper.id },
      { key: TableColumnsConstant.name, display: DataTableHeaderMapper.name },
      {
        key: TableColumnsConstant.class, display: DataTableHeaderMapper.class
      },
      {
        key: TableColumnsConstant.age, display: DataTableHeaderMapper.age
      },
      {
        key: TableColumnsConstant.phoneNum, display: DataTableHeaderMapper.phoneNum
      },
      { key: TableColumnsConstant.CREATED_BY, display: DataTableHeaderMapper.createdBy },
      {
        key: TableColumnsConstant.CREATED_DATE, display: DataTableHeaderMapper.creationDate,
        config: { isDate: true, format: StringConstant.DDMMYYY_FORMAT }
      },


    ];
  }
}
