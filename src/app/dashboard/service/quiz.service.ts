import { Injectable } from '@angular/core';
import { TableColumnsConstant } from '../../shared/constants/table-columns.constant';
import { DataTableHeaderMapper } from '../../shared/mappers/data-table-mapper';
import { StringConstant } from '../../shared/constants/string-constant';
import { ActionType } from '../../shared/models/new/data-table-actions';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { EndPointUrlConst } from '../../shared/constants/end-point-url.constant';
import { DataTableButtons, TableHeaders } from '../../shared/models/new/table-headers.model copy';
import { HttpClient } from '@angular/common/http';
import { CategoryEnum, QuizQuestionsModel, QuizResponseModel } from '../models/quiz-models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getBoolean(): Observable<QuizResponseModel> {
    return this.http.get<QuizResponseModel>(`${environment.baseUrl}${EndPointUrlConst.getBoolean}`);
  }
  getQandA(): Observable<QuizResponseModel> {
    return this.http.get<QuizResponseModel>(`${environment.baseUrl}${EndPointUrlConst.getQuestionAnswer}`);
  }
  getFillLetter(): Observable<QuizResponseModel> {
    return this.http.get<QuizResponseModel>(`${environment.baseUrl}${EndPointUrlConst.getFillWord}`);
  }
  
  getAllQuizData(): Observable<QuizQuestionsModel[]> {
    return forkJoin([
      this.getBoolean(),
      this.getQandA(),
      this.getFillLetter()
    ]).pipe(
      map((responses: [QuizResponseModel, QuizResponseModel, QuizResponseModel]) => {
        // Flatten the data arrays from each response
        return [
          ...responses[0].data, // Data from getBoolean
          ...responses[1].data, // Data from getQandA
          ...responses[2].data  // Data from getFillLetter
        ];
      })
    );
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
      { key: TableColumnsConstant.ID, display: DataTableHeaderMapper.questionId },
      { key: TableColumnsConstant.question, display: DataTableHeaderMapper.question,
        config: { isSmallText: true }
       },
      {
        key: TableColumnsConstant.type, display: DataTableHeaderMapper.category
      },
      { key: TableColumnsConstant.CREATED_BY, display: DataTableHeaderMapper.createdBy },
      {
        key: TableColumnsConstant.CREATED_DATE, display: DataTableHeaderMapper.creationDate,
        config: { isDate: true, format: StringConstant.DDMMYYY_FORMAT }
      },


    ];
  }

}
