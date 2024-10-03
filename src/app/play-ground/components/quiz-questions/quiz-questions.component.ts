import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { QuizPlayService } from './../../services/quiz-play.service';
import { QuizService } from './../../../dashboard/service/quiz.service';
import { SpeechService } from './../../../shared/services/speech.service';
import { SoundService } from './../../../shared/services/sound.service';
import { AnimationService } from './../../../shared/services/animation.service';
import { TimerService } from './../../../shared/services/timer.service';
import { StudentService } from './../../../dashboard/service/student.service';
import { Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Time } from '@angular/common';
import { CategoryEnum, QuizQuestionsModel, QuizResponseModel } from '../../../dashboard/models/quiz-models/quiz.model';
import { NumberConstant } from '../../../shared/constants/number-constant';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentModel } from '../../../dashboard/models/students/student-list.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerateIdConst } from '../../../shared/constants/generate-id.constant';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CanvasConstant, SoundConstant, SoundConstantUrl } from '../../constants/interation-effects';
import { InteractionEffectEnum } from '../../model/interaction-effect.model';
import { Config } from '@lottiefiles/dotlottie-web';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrl: './quiz-questions.component.scss'
})
export class QuizQuestionsComponent implements OnInit, OnChanges {

  @Input() currentQuestion!: QuizQuestionsModel | null;
  @Input() luckyNum!: number | null;
  @Input() selectedStudent!: StudentModel | null;

  questionList: QuizQuestionsModel[] = [];
  questionType = CategoryEnum;
  quizForm!: FormGroup;
  sanitizedQuestion: SafeHtml = '';
  revaelAnswer: boolean = false;
  timerInterval: any;
  timerValue!: number;
  isAnimationStopped = false;
  @Output() isSubmit = new EventEmitter<boolean>();

  @ViewChild('timerCanvas', { static: true }) timerCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private studentService: StudentService, private speechService: SpeechService,
    private timerService: TimerService, private animationService: AnimationService,
    private soundService: SoundService, private quizService: QuizService,
    private quizPlayService: QuizPlayService, private localStorageService: LocalStorageService,
    private fb: FormBuilder, private sanitizer: DomSanitizer, private ngZone: NgZone) {
    this.quizForm = this.createForm();
    this.loadSound();
    this.ngZone.run(() => {

    })
  }

  ngOnInit(): void {
    // this.getQuestions();
  }

  ngAfterViewInit(): void {
    if (this.timerCanvas && this.timerCanvas.nativeElement) {
      this.loadInteractions(InteractionEffectEnum.TIMER);
      this.timerService.getTimer().subscribe(value => {
        this.timerValue = value;
        if (this.timerValue <= 0) {
          this.stopAnimation(InteractionEffectEnum.TIMER)
        }
      });
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.getRandomQuestion();
    this.resetAnimationState();
  }

  getRandomQuestion() {
    // if (this.luckyNum && this.selectedStudent && this.selectedStudent.id) {
    //   this.currentQuestion = this.quizPlayService.getNextQuestionForStudent(this.selectedStudent);

    //   console.log(this.currentQuestion, 'current question ');
    // }
    if (this.currentQuestion) {
      this.sanitizedQuestion = this.sanitizer.bypassSecurityTrustHtml(this.currentQuestion.question);
    }
  }

  // getQuestions() {
  //   this.quizService.getAllQuizData().subscribe((data: QuizQuestionsModel[]) => {
  //     if (data && data.length > NumberConstant.ZERO) {
  //       this.questionList = data;
  //       this.quizPlayService.setQuizQuestions(this.questionList);
  //     }
  //   }, (error: HttpErrorResponse) => console.log(error.error));
  // }

  loadInteractions(type: InteractionEffectEnum) {
    switch (type) {
      case InteractionEffectEnum.TIMER:
        this.timerService.startTimer(this.currentQuestion?.timer || 40);
        this.animationService.playAnimation(this.animationConfig(InteractionEffectEnum.TIMER));
        this.soundService.playSound(SoundConstant.TIMER);
        break;

      default:
        break;
    }
  }

  stopTImer() {
    if (this.timerValue) {
      this.stopAnimation(InteractionEffectEnum.TIMER)

    }
  }


  stopAnimation(type: InteractionEffectEnum): void {
    if (this.isAnimationStopped) return;
    switch (type) {
      case InteractionEffectEnum.TIMER:
        this.soundService.stopSound(SoundConstant.TIMER);
        this.timerService.stopTimer();
        this.animationService.stopAnimation(this.animationConfig(InteractionEffectEnum.TIMER));
        this.isAnimationStopped = true;
        break;

      default:
        break;
    }
  }


  selectOption(item: string) {
    this.userAnswer.patchValue(item);
    console.log(this.userAnswer.value);
  }

  onReveal() {
    this.revaelAnswer = true;
  }

  submitAnswer() {
    if (this.currentQuestion && this.selectedStudent && this.selectedStudent.id &&
      this.userAnswer.value) {
      this.quizPlayService.submitAnswer(this.selectedStudent,
        this.currentQuestion, this.userAnswer.value);
    }
    this.resetValues();
    this.isSubmit.emit(true);
  }

  resetValues() {
    this.currentQuestion = null;
    this.revaelAnswer = false;
    this.quizForm.reset();
    this.quizForm.setErrors(null);
  }


  get userAnswer(): AbstractControl {
    return this.quizForm.get('userAnswer') as AbstractControl
  }

  loadSound() {
    this.soundService.loadSound(SoundConstant.TIMER, SoundConstantUrl.TIMER);
    this.soundService.loadSound(SoundConstant.CORRECT, SoundConstantUrl.CORRECT);
    this.soundService.loadSound(SoundConstant.WRONG, SoundConstantUrl.WRONG);
    this.soundService.loadSound(SoundConstant.CELEBRATION, SoundConstantUrl.CARD_CLICK);
  }

  animationConfig(type: InteractionEffectEnum): Config {
    const config: Config = {
      canvas: this.timerCanvas.nativeElement,
      loop: true, autoplay: true
    };
    switch (type) {
      case InteractionEffectEnum.TIMER:
        config.src = CanvasConstant.TIMER
        break;

      default:
        break;
    }
    return config
  }

  resetAnimationState(): void {
    this.isAnimationStopped = false;
  }

  createForm(): FormGroup {
    return this.fb.group({
      question: ['', [Validators.required]],
      userAnswer: ['', [Validators.required]],
      userOption: ['', [Validators.required]],

    })
  }

  ngOnDestroy(): void {
    this.selectedStudent = null
    this.stopAnimation(InteractionEffectEnum.TIMER);
    this.timerService.stopTimer();
    this.selectedStudent = null;
  }

}
