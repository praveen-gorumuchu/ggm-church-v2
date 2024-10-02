import { CategoryListModel } from './../../models/quiz-models/quiz.model';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { QuizService } from './../../service/quiz.service';
import { Component, ViewChild } from '@angular/core';
import { DashboardTitles } from '../../constants/dashboard-title.constant';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { UserRoleEnum } from '../../../shared/models/user-data/uder-list.model';
import { DataTableButtons, TableHeaders } from '../../../shared/models/new/table-headers.model copy';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { StudentModel, StudentModelRes } from '../../models/students/student-list.model';
import { Router } from '@angular/router';
import { LoginService } from '../../../shared/services/login.service';
import { UtilSharedService } from '../../../shared/services/util-shared.service';
import { StudentService } from '../../service/student.service';
import { MessageBarService } from '../../../shared/services/message-bar.service';
import { TableColumnsConstant } from '../../../shared/constants/table-columns.constant';
import { NumberConstant } from '../../../shared/constants/number-constant';
import { HttpErrorResponse } from '@angular/common/http';
import { ActionType, DataTableActions } from '../../../shared/models/new/data-table-actions';
import { StringConstant } from '../../../shared/constants/string-constant';
import { QuizQuestionsModel } from '../../models/quiz-models/quiz.model';
import { GenerateIdConst } from '../../../shared/constants/generate-id.constant';
import { CategoryList } from '../../models/quiz-models/category-list.const';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss', '../../dashboard-style.scss']
})
export class QuizComponent {
  titles = DashboardTitles;
  formGroup!: FormGroup;
  userRole!: UserRoleEnum;
  userRoleEnum = UserRoleEnum;
  isSearch: boolean = false;
  isLoading: boolean = false;
  isLoadingSpin: boolean = false;
  columns: TableHeaders[] = [];
  dataSource: QuizQuestionsModel[] = [];
  buttons: DataTableButtons[] = [];
  questionList: QuizQuestionsModel[] = [];
  filteredName!: Observable<QuizQuestionsModel[]>;
  filteredType!: Observable<CategoryListModel[]>;

  @ViewChild(MatAutocompleteTrigger) questionNameAuto!: MatAutocompleteTrigger;
  @ViewChild(MatAutocompleteTrigger) questionTypeAuto!: MatAutocompleteTrigger;

  constructor(private router: Router, private loginService: LoginService,
    private quizService: QuizService, private messageBarService: MessageBarService,
    private utilSharedService: UtilSharedService, private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {
    this.formGroup = this.createForm();
    this.userRole = this.loginService.loginUser.role;
    this.getQuizQuestions();
  }

  ngOnInit(): void {
    this.getFilteredOptions();
  }


  getFilteredOptions() {
    this.filteredName = this.utilSharedService.filteredDataComesFirst(
      this.questionId, this.questionList, TableColumnsConstant.ID, true, true);

    this.filteredType =
      this.utilSharedService.filteredDataComesFirst(this.questionType, CategoryList,
        TableColumnsConstant.name, true, true);
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

  displayQuestioId(question: QuizQuestionsModel): string {
    return question && question.id ? question.id : '';
  }

  displayQuestionType(question: CategoryListModel): string {
    return question && question.value ? question.value : '';
  }

  onNameSelected(event: any) { }

  onTypeSelected(event: any) { }

  getQuizQuestions() {
    const existing: QuizQuestionsModel[] = this.localStorageService.getData(GenerateIdConst.quiz);
    if (existing) this.questionList = existing;
    else {
      this.quizService.getAllQuizData().subscribe((res: QuizQuestionsModel[]) => {
        if (res && res.length > NumberConstant.ZERO) {
          this.questionList = res.sort((a: any, b: any) => a['id'] - b['id']);
          this.getFilteredOptions();
        }
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.messageBarService.showErorMsgBar(error?.error?.message);
      });
    }

  }

  callToDataTable(data: QuizQuestionsModel[]) {
    this.columns = this.quizService.setDataTableCols();
    this.buttons = this.quizService.setDataTableButtons();
    if (this.columns && this.columns.length > NumberConstant.ZERO) {
      const extractVal = this.utilSharedService.extractValues(data, TableColumnsConstant.question) as QuizQuestionsModel[];
      this.dataSource = this.utilSharedService.alphaNumericSort(extractVal, TableColumnsConstant.ID);
      this.isSearch = true
    } else {
      this.isLoading = false;
      this.messageBarService.showErorMsgBar(StringConstant.ERROR_MSG);
    }
  }


  searchData() {
    const type = this.questionType?.value;
    const qId = this.questionId?.value;
  
    const typeVal = (type?.name || '')?.trim()?.toLowerCase();
    const idVal = (qId?.id || '')?.trim()?.toLowerCase();
  
    // If no filters are provided, return the full list
    if (!typeVal && !idVal) {
      this.messageBarService.showErorMsgBar(StringConstant.GLOBAL_RESULT);
      this.callToDataTable(this.questionList);
      return;
    }
  
    // Filter based on provided values
    const filteredData = this.questionList.filter((data: QuizQuestionsModel) => {
        if(typeVal && typeVal !== '' && idVal && idVal !== '') 
          return data?.type?.name.toLowerCase() === typeVal &&
            data.id.toLowerCase() === idVal
        else if(typeVal && typeVal !== '')
          return data?.type?.name?.toLowerCase() === typeVal;
        else if(idVal && idVal !== '') 
          return data?.id.toLowerCase() === idVal;
        else return []
    });
  
    // Call the method to update the table with the filtered data
    this.callToDataTable(filteredData);
  }
  
  
  

  onRegister() {
    this.router.navigate(['dashboard', 'create-quiz'])
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

  get questionId(): AbstractControl {
    return this.formGroup.get('questionId') as AbstractControl
  }

  get questionType(): AbstractControl {
    return this.formGroup.get('questionType') as AbstractControl
  }

  createForm() {
    return this.fb.group({
      questionId: [''],
      questionType: ['']
    })
  }

  ngOnDestroy(): void {


  }


}
