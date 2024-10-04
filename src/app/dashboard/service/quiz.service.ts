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
import JSZip from 'jszip';

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

  downloadJsonAsZip(key: string) {
    const data = localStorage.getItem(key);

    if (data) {
      // Parse the data from localStorage
      const parsedData: QuizQuestionsModel[] = JSON.parse(data);

      // Divide the data into three categories
      const categorizedData:any = {
        QNA: parsedData.filter(item => item.type.name === CategoryEnum.QNA),
        FILL_WORD: parsedData.filter(item => item.type.name === CategoryEnum.FILL_WORD),
        OPTIONS: parsedData.filter(item => item.type.name === CategoryEnum.OPTIONS),
      };

      // Create a new JSZip instance
      const zip = new JSZip();

      // Add JSON files to the zip
      Object.keys(categorizedData).forEach((category) => {
        const jsonData = { data: categorizedData[category] };
        zip.file(`${category}.json`, JSON.stringify(jsonData));
      });

      // Generate the zip file and trigger download
      zip.generateAsync({ type: 'blob' }).then(content => {
        const url = window.URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quiz_data.zip';
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
    } 
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
        config: { isSmallText: true, max: 20 }
       },
       { key: TableColumnsConstant.answer, display: DataTableHeaderMapper.question,
       },
      {
        key: TableColumnsConstant.type, display: DataTableHeaderMapper.category,
        config: {obj: true, key: TableColumnsConstant.value}
      },
      { key: TableColumnsConstant.CREATED_BY, display: DataTableHeaderMapper.createdBy },
      {
        key: TableColumnsConstant.CREATED_DATE, display: DataTableHeaderMapper.creationDate,
        config: { isDate: true, format: StringConstant.DDMMYYY_FORMAT }
      },
    ];
  }

}
