import { AttendanceService } from './../../../dashboard/service/attendance.service';
import { MessageBarService } from './../../../shared/services/message-bar.service';
import { QuizQuestionsModel } from './../../../dashboard/models/quiz-models/quiz.model';
import { QuizService } from './../../../dashboard/service/quiz.service';
import { QuizPlayService } from './../../services/quiz-play.service';
import { SpeechService } from './../../../shared/services/speech.service';
import { UtilSharedService } from './../../../shared/services/util-shared.service';
import { StudentService } from './../../../dashboard/service/student.service';
import { AnimationService } from './../../../shared/services/animation.service';
import { Config, DotLottie } from '@lottiefiles/dotlottie-web';
import { PlayGroundService } from './../../services/play-ground.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CanvasConstant } from '../../constants/interation-effects';
import { TimerService } from '../../../shared/services/timer.service';
import { SoundService } from '../../../shared/services/sound.service';
import { TitleConstant } from '../../../shared/constants/title.constant';
import { CardColors } from '../../constants/cards-colors.constant';
import { NumberConstant } from '../../../shared/constants/number-constant';
import { StudentModel, StudentModelRes } from '../../../dashboard/models/students/student-list.model';
import { TableColumnsConstant } from '../../../shared/constants/table-columns.constant';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { PlayGroundConstant } from '../../constants/play-ground-contant';
import { QuizNaviationEnum, QuizNavigationArrowEnum, QuizNavigationStatus } from '../../model/quiz-navigation.model';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { MatDailogComponent } from '../../../shared/components/mat-dailog/mat-dailog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../../shared/constants/dailog-constant';
import { Route, Router } from '@angular/router';
import { RouterConstant } from '../../../shared/constants/router.constant';
import { StringConstant } from '../../../shared/constants/string-constant';
import { Observable } from 'rxjs';
import { AttendanceModel } from '../../../dashboard/models/quiz-models/attendance/attendance.model';

@Component({
  selector: 'app-audience',
  templateUrl: './audience.component.html',
  styleUrl: './audience.component.scss'
})
export class AudienceComponent implements OnInit {
  playGroundConst = PlayGroundConstant;
  title = TitleConstant;
  quizForm!: FormGroup;
  dotLottie!: DotLottie | null;
  timerInterval: any;
  timerValue: number = 20;
  cards = CardColors.colors;
  studentList: StudentModel[] = [];
  filteredStudentName!: Observable<StudentModel[]>;
  enableCard!: boolean;
  navigationStatus!: QuizNavigationStatus;
  forwardArrow = false;
  enableStudentSelection: boolean = false;
  backWardArow = false;
  enableQuestion: boolean = false;
  luckyNumber!: number;
  currentQuestion!: QuizQuestionsModel | null;
  currentStudentIndex = -1;
  isLoadingSpin: boolean = false;
  round: number = NumberConstant.ONE;

  @ViewChild('dotlottieCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  questionList!: QuizQuestionsModel[];

  constructor(private playGroundService: PlayGroundService,
    private timerService: TimerService, private animationService: AnimationService,
    private soundService: SoundService, private studentService: StudentService,
    private utilSharedService: UtilSharedService, private fb: FormBuilder,
    private speechService: SpeechService, private quizPlayService: QuizPlayService,
    private quizService: QuizService, private localStorageService: LocalStorageService,
    public dialog: MatDialog, private router: Router, private messageBarService: MessageBarService,
    private attendanceService: AttendanceService) {
    this.quizForm = this.createFormGroup();
    this.enableStudentSelection = true;

  }

  ngOnInit(): void {
    this.getStudents();
    this.getQuestions();
  }

  getQuestions() {
    // const data = this.localStorageService.getData(GenerateIdConst.quiz);
    // if(data){
    //   this.questionList = data;
    //   this.quizPlayService.setQuizQuestions(this.questionList);
    // }
    this.quizService.getAllQuizData().subscribe((data: QuizQuestionsModel[]) => {
      if (data && data.length > NumberConstant.ZERO) {
        this.questionList = data;
        this.quizPlayService.setQuizQuestions(this.questionList);
      }
    }, (error: HttpErrorResponse) => console.log(error.error));
  }

  manualSelection(event: any) {
    const findIdx = this.studentList.findIndex((data: StudentModel) =>
      data.id === this.studentName.value.id);
    this.currentStudentIndex = findIdx;
    console.log({
      'currentNum': this.currentStudentIndex,
      'totalStudent': this.studentList.length - this.currentStudentIndex,
      'selectedStudent': this.studentName.value.name
    });
  }

  /**
   * @function onStudentSelection
   * @description On Student selection by admin
   * backward arrow will be enabled to re-select the student if needed
   */

  onStudentSelection() {
    if (this.studentName.value && (this.studentName.value as any).name) {
      const name = (this.studentName.value.name as string).split('.')[NumberConstant.ONE];
      const str = `${TitleConstant.HELLO} ${name} ${TitleConstant.PICK_YOUR_LUCKY_CARD}`;
      this.resetNavigation();
      this.resetArrows();
      this.navigationStatus = {
        next: QuizNaviationEnum.QZ_PICK_CARD,
      }
      this.enableCard = true;
      this.speechService.speak(str, 0.8, 0.9, 1);
      this.backWardArow = true;
    } else {
      this.enableCard = false;
      this.enableQuestion = false
    };
    const findIdx = this.studentList.findIndex((data: StudentModel) =>
      data.id === this.studentName.value.id);
    this.currentStudentIndex = findIdx;
  }

  /**
   * @function getFilteredOptions
   * @description Student dropdown filteration
   * 
   */

  getFilteredOptions() {
    this.filteredStudentName = this.utilSharedService.filteredDataComesFirst(
      this.studentName, this.studentList, TableColumnsConstant.name, true, true);
  }

  /**
   * @function getStudents
   * @description get Student api to get the student list
   * 
   */

  getStudents() {
    this.isLoadingSpin = true;
    this.studentService.getStudentIds().subscribe((res: StudentModelRes) => {
      if (res && res.data && res.data.length > NumberConstant.ZERO) {
        this.studentList = this.utilSharedService.alphaNumericSort(res.data, TableColumnsConstant.ID);
        this.getAvaliableStudents();

        this.getFilteredOptions();
        this.isLoadingSpin = false;
      }
    }, (error: HttpErrorResponse) => {
      this.isLoadingSpin = false;
      this.messageBarService.showErorMsgBar(StringConstant.ERROR_MSG)
    });
  }

  getAvaliableStudents() {
    const availability: AttendanceModel[] = this.attendanceService.getAttendance();
    this.studentList = this.studentService.availableStudents(this.studentList, availability)
  }


  displayStudentName(student: StudentModel): string {
    return student && student.name ? student.name : '';
  }

  playAnimation(): void {
    this.animationService.playAnimation(this.animationConfig());
    this.timerService.startTimer(20);
  }

  stopAnimation(): void {
    this.animationService.stopAnimation(this.animationConfig());
    this.timerService.stopTimer();
    this.soundService.stopSound('clock')
  }

  onArrowClick(event: QuizNavigationArrowEnum) {
    this.resetNavigation();
    this.resetArrows();
    if (event === QuizNavigationArrowEnum.BACKWARD &&
      this.navigationStatus.next === QuizNaviationEnum.QZ_PICK_CARD) {
      this.enableStudentSelection = true;
    } else if (event === QuizNavigationArrowEnum.FORWARD
      && this.navigationStatus.next === QuizNaviationEnum.QZ_PICK_CARD) {
      this.enableQuestion = true;
    } else if (event === QuizNavigationArrowEnum.FORWARD
      && this.navigationStatus.next === QuizNaviationEnum.QZ_QUESTION_SCREEN) {
      this.enableStudentSelection = true
    } else if (event === QuizNavigationArrowEnum.FORWARD) {
    }
  }

  /**
   * @function onCardClick emit the number from child
   * @param evnt getLcuky number
   */

  onCardClick(evnt: number) {
    this.resetNavigation();
    this.resetArrows();
    this.enableQuestion = true;
    this.luckyNumber = evnt
    this.navigationStatus = {
      next: QuizNaviationEnum.QZ_QUESTION_SCREEN
    };
    this.quizPlayService.addStudent(this.studentName.value);
    this.getRandomQuestion();

  }

  isSubmitted(evnt: boolean) {
    const remainingPool = this.quizPlayService.getRemainingPoolList().length > 0;
    if (evnt) {
      this.resetNavigation();
      this.resetArrows();
      if (remainingPool) {
        this.enableStudentSelection = true;
        this.currentStudentIndex++;
        if (this.currentStudentIndex < this.studentList.length) {
          const currentStudent = this.studentList[this.currentStudentIndex];
          this.studentName.patchValue(currentStudent);
          this.onStudentSelection();
        }
      } else this.openDailog();
      if (this.currentStudentIndex >= this.studentList.length) {
        this.round++;
        this.currentStudentIndex = -1;
        this.studentName.patchValue(this.studentList[0]);
      }
    }
  }

  openDailog() {
    const dialogRef = this.dialog.open(MatDailogComponent, {
      data: DialogData.noQuestionsLeft
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.quizPlayService.endQuiz();
        this.router.navigate([RouterConstant.evaluation])
      }
    });


  }


  getRandomQuestion() {
    const isStudentExist = this.studentName.value && this.studentName.value.id || false;
    const remainingPool = this.quizPlayService.getRemainingPoolList().length > 0;
    if (isStudentExist && remainingPool) {
      this.currentQuestion = this.quizPlayService.getNextQuestionForStudent(this.studentName.value);
    } else {
      this.currentQuestion = null;
      this.resetNavigation();
    }
  }

  resetArrows() {
    this.forwardArrow = false;
    this.backWardArow = false;
  }

  resetNavigation() {
    this.enableCard = false;
    this.enableQuestion = false;
    this.enableStudentSelection = false;
  }

  get studentName(): AbstractControl {
    return this.quizForm.get('studentName') as AbstractControl;
  }

  animationConfig(): Config {
    return {
      src: CanvasConstant.START,
      canvas: this.canvas.nativeElement,
      autoplay: true, loop: true
    }
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      studentName: ['', [Validators.required]]
    })
  }

  ngOnDestroy(): void {
    this.enableCard = false;
    this.forwardArrow = false;
    this.backWardArow = false;
    this.quizPlayService.endQuiz();
  }

}
