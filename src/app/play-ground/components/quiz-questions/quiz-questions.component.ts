import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { QuizPlayService } from './../../services/quiz-play.service';
import { QuizService } from './../../../dashboard/service/quiz.service';
import { SpeechService } from './../../../shared/services/speech.service';
import { SoundService } from './../../../shared/services/sound.service';
import { AnimationService } from './../../../shared/services/animation.service';
import { TimerService } from './../../../shared/services/timer.service';
import { StudentService } from './../../../dashboard/service/student.service';
import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CategoryEnum, QuizQuestionsModel } from '../../../dashboard/models/quiz-models/quiz.model';
import { StudentModel } from '../../../dashboard/models/students/student-list.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CanvasConstant, SoundConstant, SoundConstantUrl } from '../../constants/interation-effects';
import { InteractionEffectEnum } from '../../model/interaction-effect.model';
import { Config } from '@lottiefiles/dotlottie-web';
import { MatRadioChange } from '@angular/material/radio';
import { NumberConstant } from '../../../shared/constants/number-constant';
import { StringConstant } from '../../../shared/constants/string-constant';

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
  isValidAnswer: boolean = false;


  @Output() isSubmit = new EventEmitter<boolean>();

  @ViewChild('correctAnswer', { static: true }) correctAnswer!: ElementRef<HTMLCanvasElement>;
  @ViewChild('inCorrectAnswer', { static: true }) inCorrectAnswer!: ElementRef<HTMLCanvasElement>;
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

  submitAnswer() {
    if (this.currentQuestion && this.selectedStudent && this.selectedStudent.id &&
      this.userAnswer.value) {
      this.quizPlayService.submitAnswer(this.selectedStudent,
        this.currentQuestion, this.userAnswer.value);
        this.resetInterationEffects();
    }
    setImmediate(() => {
      this.isSubmit.emit(true);
      this.resetValues();

    })
  }


  selectOption(item: string) {
    this.userAnswer.patchValue(item);
  }


  validateAns(event: MatRadioChange) {
    if (event.value === StringConstant.TRUE) {
      this.userAnswer.patchValue(this.currentQuestion?.answer);
    } else if (event.value === StringConstant.FALSE) {
      this.userAnswer.patchValue(StringConstant.FALSE);
    }
  }

  /**
   * @function getRandomQuestion
   * @description function to give the randomised question 
   */


  getRandomQuestion() {
    if (this.currentQuestion) {
      this.sanitizedQuestion = this.sanitizer.bypassSecurityTrustHtml(this.currentQuestion.question);
      this.timerValue = this.currentQuestion.timer || 40;
    }
  }

  /**
   * @function loadInteractions
   * @description function to play the interactions such as sound, animation, timer
   * @param type
   */

  loadInteractions(type: InteractionEffectEnum) {
    this.resetAnimationState();
    switch (type) {
      case InteractionEffectEnum.TIMER:
        this.timerService.startTimer(this.currentQuestion?.timer || 40);
        if (this.timerCanvas.nativeElement) {
          this.animationService.playAnimation(this.animationConfig(InteractionEffectEnum.TIMER));
        }
        this.soundService.playSound(SoundConstant.TIMER);
        break;

      case InteractionEffectEnum.CORRECT:
        if (this.correctAnswer.nativeElement) {
          this.animationService.playAnimation(this.animationConfig(InteractionEffectEnum.CORRECT));
        }
        this.soundService.playSound(SoundConstant.CORRECT);
        break;

      case InteractionEffectEnum.WRONG:
        if (this.inCorrectAnswer.nativeElement) {
          this.animationService.playAnimation(this.animationConfig(InteractionEffectEnum.WRONG));
        }
        this.soundService.playSound(SoundConstant.WRONG);

        break;

      default:
        break;
    }
  }




  stopTImer(flag: boolean) {
    if (flag && this.currentQuestion?.timer) {
      this.timeTaken.patchValue(Number(this.currentQuestion?.timer) - this.timerValue);
    }
    if (this.timerValue) {
      this.stopAnimation(InteractionEffectEnum.TIMER)
    }
  }


  stopAnimation(type: InteractionEffectEnum): void {
    switch (type) {
      case InteractionEffectEnum.TIMER:
        this.soundService.stopSound(SoundConstant.TIMER);
        this.timerService.stopTimer();
        if (this.timerCanvas.nativeElement) {
          this.animationService.stopAnimation(this.animationConfig(InteractionEffectEnum.TIMER));
        }
        this.isAnimationStopped = true;

        break;

      case InteractionEffectEnum.CORRECT:
        if (this.correctAnswer.nativeElement) {
          this.animationService.stopAnimation(this.animationConfig(InteractionEffectEnum.CORRECT));
        }
        this.soundService.stopSound(SoundConstant.CORRECT);

        break;

      case InteractionEffectEnum.WRONG:
        if (this.inCorrectAnswer.nativeElement) {
          this.animationService.stopAnimation(this.animationConfig(InteractionEffectEnum.WRONG));
        }
        this.soundService.stopSound(SoundConstant.WRONG);

        break;

      default:
        this.resetAnimationState();
        break;
    }
  }

  onReveal() {
    this.revaelAnswer = true;
    if (this.revaelAnswer && this.userAnswer.value === this.currentQuestion?.answer) {
      this.loadInteractions(InteractionEffectEnum.CORRECT);
      setTimeout(() => {
        this.stopAnimation(InteractionEffectEnum.CORRECT);
        this.soundService.playSound(SoundConstant.CORRECT);
      }, NumberConstant.ONE_THOUSAND);
    } else if (this.userAnswer.value !== this.currentQuestion?.answer) {
      this.loadInteractions(InteractionEffectEnum.WRONG);
      setTimeout(() => {
        this.stopAnimation(InteractionEffectEnum.WRONG);
        this.soundService.stopSound(SoundConstant.WRONG);
      }, NumberConstant.FIVE_THOUSAND)
    }
  }


  resetValues() {
    this.currentQuestion = null;
    this.revaelAnswer = false;
    this.quizForm.reset();
    this.quizForm.setErrors(null);
    this.sanitizedQuestion = '';
    this.revaelAnswer = false;
    this.isAnimationStopped = false;
  }



  loadSound() {
    this.soundService.loadSound(SoundConstant.TIMER, {
      src: SoundConstantUrl.TIMER,
      loop: true, volume: 2.0
    });
    this.soundService.loadSound(SoundConstant.CORRECT, {
      src: SoundConstantUrl.CORRECT, loop: false, volume: 3.0
    });
    this.soundService.loadSound(SoundConstant.WRONG, {
      src: SoundConstantUrl.WRONG, loop: true, volume: 2.0
    });
    this.soundService.loadSound(SoundConstant.CELEBRATION, {
      src: SoundConstantUrl.CARD_CLICK, loop: true
    });
  }

  animationConfig(type: InteractionEffectEnum): Config {
    const config: Config = {
      loop: true, autoplay: true,
      canvas: null as any
    };
    switch (type) {
      case InteractionEffectEnum.TIMER:
        config.src = CanvasConstant.TIMER
        config.canvas = this.timerCanvas.nativeElement;

        return config

      case InteractionEffectEnum.CORRECT:
        config.src = CanvasConstant.CORRECT
        config.canvas = this.correctAnswer.nativeElement

        return config

      case InteractionEffectEnum.WRONG:
        config.src = CanvasConstant.WRONG
        config.canvas = this.inCorrectAnswer.nativeElement
        return config

      default:
        return null as any;
    }

  }

  resetAnimationState(): void {
    this.isAnimationStopped = false;
  }

  getQuestionId(): string {
    if (this.currentQuestion && this.currentQuestion.id) {
      return this.currentQuestion.id.replace(/\D/g, '');
    }
    return '';
  }

  getActiveRadio(item: string) {
    const res = (this.userAnswer.value as string).trim() === item.trim();
    return res
  }


  get userAnswer(): AbstractControl {
    return this.quizForm.get('userAnswer') as AbstractControl
  }

  get userOption(): AbstractControl {
    return this.quizForm.get('userOption') as AbstractControl
  }

  get manulAns(): AbstractControl {
    return this.quizForm.get('manulAns') as AbstractControl
  }

  get timeTaken(): AbstractControl {
    return this.quizForm.get('timeTaken') as AbstractControl
  }

  resetInterationEffects() {
    if (this.timerCanvas.nativeElement) {
      this.animationService.stopAnimation(this.animationConfig(InteractionEffectEnum.TIMER))
    }
    if (this.correctAnswer.nativeElement) {
      this.animationService.stopAnimation(this.animationConfig(InteractionEffectEnum.CORRECT))
    }
    if (this.inCorrectAnswer.nativeElement) {
      this.animationService.stopAnimation(this.animationConfig(InteractionEffectEnum.WRONG))
      this.soundService.stopSound(SoundConstant.CORRECT);
      this.soundService.stopSound(SoundConstant.TIMER);
      this.soundService.stopSound(SoundConstant.WRONG);
      this.timerService.stopTimer();
    }
  }


  createForm(): FormGroup {
    return this.fb.group({
      question: ['', []],
      userAnswer: ['', [Validators.required]],
      userOption: [null, []],
      manulAns: [null, []],
      timeTaken: [null]
    })
  }

  ngOnDestroy(): void {
    this.selectedStudent = null
    this.stopAnimation(InteractionEffectEnum.TIMER);
    this.timerService.stopTimer();
    this.selectedStudent = null;
  }

}
