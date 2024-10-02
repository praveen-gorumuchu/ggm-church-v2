import { CategoryList } from './../../models/quiz-models/category-list.const';
import { QuizService } from './../../service/quiz.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DashboardTitles } from '../../constants/dashboard-title.constant';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfo } from '../../../shared/models/user-data/uder-list.model';
import { IdGenerationService } from '../../../shared/services/generate-id.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { LoginService } from '../../../shared/services/login.service';
import { UtilSharedService } from '../../../shared/services/util-shared.service';
import { EncriptionService } from '../../../shared/services/encription.service';
import { FormsService } from '../../../shared/services/forms.service';
import { MessageBarService } from '../../../shared/services/message-bar.service';
import { NumberConstant } from '../../../shared/constants/number-constant';
import { GenerateIdConst } from '../../../shared/constants/generate-id.constant';
import { StringConstant } from '../../../shared/constants/string-constant';
import { CategoryEnum, CategoryListModel, QuizQuestionsModel, QuizResponseModel } from '../../models/quiz-models/quiz.model';
import { MatSelectChange } from '@angular/material/select';
import { MatRadioChange } from '@angular/material/radio';


@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss', '../../dashboard-style.scss']
})
export class CreateQuizComponent implements OnChanges, OnInit, OnChanges {
  categroryList: CategoryListModel[] = CategoryList;
  typeEnum = CategoryEnum;
  titles = DashboardTitles;
  quizForm!: FormGroup;
  questionList: QuizQuestionsModel[] = [];
  loginUser!: UserInfo

  constructor(private fb: FormBuilder, private idGenerationService: IdGenerationService,
    private localStorageService: LocalStorageService, private quizService: QuizService,
    private loginService: LoginService, private utilService: UtilSharedService,
    private formService: FormsService,
    private messageBarService: MessageBarService
  ) {
    this.loginUser = this.loginService.loginUser;
    this.quizForm = this.createForm();
    this.initializeData();
  }

  ngOnInit(): void {
    this.category.valueChanges.pipe().subscribe((data: any) => {
      this.sysCategoryChange();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngAfterViewInit(): void {


  }


  initializeData(): void {
    this.questionList = [];
    const existing = this.localStorageService.getData(GenerateIdConst.quiz);
    if (existing && existing.length > 0) this.questionList = existing;
    else {
      this.quizService.getAllQuizData().subscribe((data: QuizQuestionsModel[]) => {
        if (data && data.length > NumberConstant.ZERO) {
          this.questionList = data;
        }
      })
    }
    this.idGenerationService.initialize(this.questionList);
    this.addQuestion();
  }


  onSubmit(): void {
    if (!this.quizForm.valid) {
      this.messageBarService.showErorMsgBar(StringConstant.ERROR_MSG);
      return
    }
    console.log(this.quizForm)
    const combinedData: QuizQuestionsModel[] = [...this.getNewData(), ...this.questionList];
    const uniqueData = this.utilService.removeDuplicates(combinedData);
    const data: QuizResponseModel = { data: uniqueData }
    this.localStorageService.setData(GenerateIdConst.quiz, uniqueData);
    console.log(uniqueData);
    this.messageBarService.showSuccessMsgBar(StringConstant.CREATE_SUCCESS);
    this.quizQuestions.clear();
    this.initializeData();

  }

  getNewData(): QuizQuestionsModel[] {
    const newData: QuizQuestionsModel[] = [];
    if (this.quizQuestions && this.quizQuestions.valid &&
      this.quizQuestions.controls.length > NumberConstant.ZERO) {
      (this.quizQuestions.value as Array<QuizQuestionsModel>).forEach((quiz: QuizQuestionsModel, i: number) => {
        const idCtrl = this.quizQuestions.controls[i].get('id') as AbstractControl;
        const type = this.quizQuestions.controls[i].get('type') as AbstractControl;
        if (quiz.question) {
          const data: QuizQuestionsModel = {
            id: idCtrl.value, question: quiz.question, answer: quiz.answer,
            type: type.value, timer: type.value.timer,
            createdBy: this.loginUser.name,
            creationDate: new Date(),
            modifiedBy: '', modifiedDate: null, deletedBy: '', deletionDate: null,
            version: NumberConstant.ZERO,
          };
          if (type.value.name === CategoryEnum.OPTIONS) {
            data.options = quiz.options;
          }
          newData.push(data);
        }
      });
    }
    return newData
  }


  onRadioSelection(event: MatRadioChange) {
    this.quizQuestions.clearValidators();
    this.quizQuestions.setErrors(null);
    this.quizQuestions.markAsUntouched();
    this.sysCategoryChange();
  }


  sysCategoryChange() {
    if (this.quizQuestions.controls.length > 0) {
      this.quizQuestions.controls.forEach((ctrl, i: number) => {
        const timer = ctrl.get('timer') as AbstractControl;
        const type = ctrl.get('type') as AbstractControl;
        if (this.deafultSelct.value === true && this.category.value) {
          type.patchValue(this.category.value);
          timer.patchValue(this.category.value.timer);
          type.disable();
        } else {
          type.patchValue(''),
            type.enable();
          timer.patchValue('')
        }
        this.resetOptionCategory(i, this.category.value);
      })
    }

  }

  onCategoryChange(event: MatSelectChange, i: number) {
    const val = event.value as CategoryListModel;
    this.quizQuestions.controls[i].get('timer')?.patchValue(event.value.timer)
    this.resetOptionCategory(i, val);
  }

  resetOptionCategory(i: number, val: CategoryListModel) {
    const ctrl: FormGroup = this.quizQuestions.controls[i] as FormGroup;
    const options: FormArray = ctrl.get('options') as FormArray;

    this.resetValidators(i);
    if (val?.name === this.typeEnum.OPTIONS) {
      options.clear();
      options.push(this.fb.control('', Validators.required)),
        options.push(this.fb.control('', Validators.required))
    }

    this.quizForm.updateValueAndValidity();
  }

  setErrors(i: number, key: string, invalid?: string, min?: number, max?: number) {
    const name = this.quizQuestions.controls[i].get(key) as AbstractControl;
    return this.formService.setErrors(name, invalid, min, max);
  }

  deleteAll() {
    this.quizQuestions.reset()
    this.quizQuestions.clear();
    const newId = this.idGenerationService.updateId(this.questionList);
    this.quizQuestions.push([]);
  }

  disableSubmit(): boolean {
    let disable = false;

    disable = this.quizQuestions.controls.some((ctrl: AbstractControl) => {
      const question = ctrl?.get('question')?.value;
      const id = ctrl.get('id')?.value;
      return !question || !id || ctrl?.get?.('question')?.invalid || ctrl?.get?.('id')?.invalid;
    })

    return disable;
  }

  downLoadData() {
    this.quizService.downloadJsonAsZip(GenerateIdConst.quiz);
  }

  get quizQuestions(): FormArray {
    return this.quizForm.get('quizQuestions') as FormArray;
  }

  removeQuestion(index: number): void {
    this.quizQuestions.removeAt(index);
    this.resetValidators(index);
  }

  addOption(question: FormGroup | any) {
    const options = question.get('options') as FormArray;
    if (options.length < 4) {
      options.push(this.fb.control('', Validators.required));
    }
  }

  // Remove an option from a question's options form array
  removeOption(question: FormGroup | any, index: number) {
    const options = question.get('options') as FormArray;
    if (options.length > 0) {
      options.removeAt(index);
      this.resetValidators(index);
    }
  }

  resetValidators(i: number) {
    const question = this.quizQuestions.controls[i] as FormGroup;
    const options = question.get('options') as FormArray;
    options.controls.forEach(control => {
      control.clearValidators(); // Remove existing validators
      control.updateValueAndValidity(); // Update validity status of each control
    });

    // Optionally reset the entire form control's error state
    options.setErrors(null);
    question.updateValueAndValidity(); // Ensure that the entire form group is updated
  }


  get deafultSelct(): AbstractControl {
    return this.quizForm.get('deafultSelct') as AbstractControl
  }


  getOptionArray(i: number): FormArray {
    return this.quizQuestions.controls[i].get('options') as FormArray
  }

  get category(): AbstractControl {
    return this.quizForm.get('category') as AbstractControl
  }


  addQuestion() {
    const type = this.deafultSelct.value && this.category.value ? this.category.value : '';
    const newId = this.idGenerationService.generateIdWithKey(GenerateIdConst.quiz);
    const questionForm: FormGroup = this.fb.group({
      id: [{ value: newId, disabled: true }, [Validators.required]],
      timer: [type.timer, [Validators.max(90)]],
      type: [type, [Validators.required]],
      question: ['', Validators.required],
      answer: [null, [Validators.required]],
      options: this.fb.array([] as any),
    });

    if (type && type.name) {
      questionForm.get('type')?.disable();
      if (type.name === CategoryEnum.OPTIONS) {
        const options = questionForm.get('options') as FormArray;
        options.push(this.fb.control('', Validators.required));
        options.push(this.fb.control('', Validators.required));
      }
    } else {
      questionForm.get('type')?.enable();
    }
    this.quizQuestions.push(questionForm);
  }

  createForm(): FormGroup {
    return this.fb.group({
      quizQuestions: this.fb.array([]),
      deafultSelct: [true],
      category: [this.categroryList, [Validators.required]],
    });
  }


  ngOnDestroy(): void {
    this.idGenerationService.resetId();

  }
}
