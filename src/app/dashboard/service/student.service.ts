import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EndPointUrlConst } from '../../shared/constants/end-point-url.constant';
import { StudentModel, StudentModelRes } from '../models/students/student-list.model';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentIds(): Observable<StudentModelRes> {
    return this.http.get<StudentModelRes>(`${environment.baseUrl}/${EndPointUrlConst.getStudent}`);
  }
}
