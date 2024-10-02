import { SpeechService } from './../../../shared/services/speech.service';
import { UtilSharedService } from './../../../shared/services/util-shared.service';
import { StudentService } from './../../../dashboard/service/student.service';
import { AnimationService } from './../../../shared/services/animation.service';
import { Config, DotLottie } from '@lottiefiles/dotlottie-web';
import { PlayGroundService } from './../../services/play-ground.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CanvasConstant } from '../../constants/canvas.constant';
import { TimerService } from '../../../shared/services/timer.service';
import { SoundService } from '../../../shared/services/sound.service';
import { TitleConstant } from '../../../shared/constants/title.constant';
import { CardColors } from '../../constants/cards-colors.constant';
import { NumberConstant } from '../../../shared/constants/number-constant';
import { StudentModel, StudentModelRes } from '../../../dashboard/models/students/student-list.model';
import { TableColumnsConstant } from '../../../shared/constants/table-columns.constant';
import { Observable } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-audience',
  templateUrl: './audience.component.html',
  styleUrl: './audience.component.scss'
})
export class AudienceComponent implements OnInit {
  @ViewChild('dotlottieCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  dotLottie!: DotLottie | null;
  timerInterval: any;
  timerValue: number = 20;
  title = TitleConstant;
  cards = CardColors.colors;
  numbers: number[] = Array.from({ length: 10 }, (_, i) => i);
  studentList: StudentModel[] = [];
  filteredStudentName!: Observable<StudentModel[]>;
  enableCard!: boolean;
  quizForm!: FormGroup;

  constructor(private playGroundService: PlayGroundService,
    private timerService: TimerService, private animationService: AnimationService,
    private soundService: SoundService, private studentService: StudentService,
    private utilSharedService: UtilSharedService, private fb: FormBuilder,
    private speechService: SpeechService) {
    this.quizForm = this.createFormGroup();
    this.soundService.loadSound('clock', '../../../../assets/sounds/clock_sound.wav');
    this.soundService.loadSound('correct', '../../../../assets/sounds/Correct_answer.wav');
    this.soundService.loadSound('wrong', '../../../../assets/sounds/wrong_answer.wav');
  }

  ngOnInit(): void {
    this.getStudents();
    this.timerService.getTimer().subscribe(value => {
      this.timerValue = value;
      if (value <= 0) this.stopAnimation();
    });
  }

  getFilteredOptions() {
    this.filteredStudentName = this.utilSharedService.filteredDataComesFirst(
      this.studentName, this.studentList, TableColumnsConstant.name, true, true);
  }

  getStudents() {
    this.studentService.getStudentIds().subscribe((res: StudentModelRes) => {
      if (res && res.data && res.data.length > NumberConstant.ZERO) {
        this.studentList = this.utilSharedService.alphaNumericSort(res.data, TableColumnsConstant.ID)
        this.getFilteredOptions();
      }
    }, (error: HttpErrorResponse) => {
    });
  }

  displayStudentName(student: StudentModel): string {
    return student && student.name ? student.name : '';
  }

  onEnter() {
    if (this.studentName.value && (this.studentName.value as any).name) {
      this.enableCard = true;
      const name = (this.studentName.value.name as string).split('.')[1];
      const str = `${TitleConstant.HELLO} ${name} ${TitleConstant.PICK_YOUR_LUCKY_CARDS}`;
      setTimeout(() => {
        this.speechService.speak(str);
      }, NumberConstant.THOUSAND)
    } else this.enableCard = false;
  }

  playAnimation(): void {
    this.soundService.playSound('correct')
    this.animationService.playAnimation(this.timerConfig());
    this.timerService.startTimer(20);
  }

  stopAnimation(): void {
    this.animationService.stopAnimation(this.timerConfig());
    this.timerService.stopTimer();
    this.soundService.stopSound('correct')
  }

  getCard(i: number): string {
    return `card${i}`
  }

  getCardStyles(index: number): { [key: string]: string } {
    return {
      backgroundColor: this.cards[index]
    }
  }

  onCardClick(i: number) {
    this.soundService.playSound('correct');
    setTimeout(() => {
      this.soundService.stopSound('correct')
    }, NumberConstant.TWO_THOUSAND)
  }

  get studentName(): AbstractControl {
    return this.quizForm.get('studentName') as AbstractControl;
  }

  timerConfig(): Config {
    return {
      src: CanvasConstant.TIMER,
      canvas: this.canvas.nativeElement,
      autoplay: true, loop: true
    }
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      studentName: ['', [Validators.required]]
    })
  }



}
