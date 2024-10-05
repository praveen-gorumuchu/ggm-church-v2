import { AnimationService } from './../../../shared/services/animation.service';
import { SoundService } from './../../../shared/services/sound.service';
import { MessageBarService } from './../../../shared/services/message-bar.service';

import { StudentService } from '../../../dashboard/service/student.service';
import { NumberConstant } from '../../../shared/constants/number-constant';
import { StorageKeyConstant } from '../../../shared/constants/storage-keys.constant';
import { TableCols, TableHeaders } from '../../../shared/models/new/table-headers.model copy';
import { QuizResult } from '../../model/student-history.model';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, } from '@angular/core';
import { StringConstant } from '../../../shared/constants/string-constant';
import { ActionType, DataTableActions } from '../../../shared/models/new/data-table-actions';
import { CanvasConstant, SoundConstant, SoundConstantUrl } from '../../constants/interation-effects';
import { InteractionEffectEnum } from '../../model/interaction-effect.model';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrl: './leader-board.component.scss'
})
export class LeaderBoardComponent implements AfterViewInit, OnDestroy{

  resultList: QuizResult[] = [];
  headers: TableHeaders[] = [];
  podiumList: QuizResult[] = [];
  showCelebration: boolean = false;

  @ViewChild('celebrationCanvas', { static: false }) celebrationCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private localStorageService: LocalStorageService,
    private studentService: StudentService, private messageBarService: MessageBarService,
    private soundService: SoundService, private animationService: AnimationService) {
    this.getResult();
    this.loadSound();
  }


  ngAfterViewInit(): void {
    if (this.celebrationCanvas && this.celebrationCanvas.nativeElement) {
      this.loadInteractions();
    }
  }

  getResult() {
    const localKeys = this.localStorageService.getKeys(StorageKeyConstant.quiz_result);
    if (localKeys) {
      const getLatest = this.findLatestDate(localKeys as string[]);
      const localData = this.localStorageService.getData(`${StorageKeyConstant.quiz_result}_${getLatest}`);
      this.resultList = localData as QuizResult[];
      const topThree = this.resultList.splice(0, 3);
      this.setPodium(topThree);
      if (this.resultList && this.resultList.length > NumberConstant.ZERO) {
        this.headers = this.studentService.setLeaderBoardHeaders();
      }
      if (this.podiumList && this.podiumList.length > NumberConstant.ZERO ||
        this.resultList && this.resultList.length > NumberConstant.ZERO) {
        this.showCelebration = true;
        setTimeout(() => {
          this.stopAnimation();
        }, NumberConstant.THIRTY * NumberConstant.THOUSAND)
      } else {
        this.messageBarService.showErorMsgBar(StringConstant.ERROR_MSG)
      }
    }
  }

  stopAnimation() {
    this.soundService.stopSound(SoundConstant.CELEBRATION);
    this.animationService.stopAnimation({
      src: CanvasConstant.CELEBRATION,
      canvas: this.celebrationCanvas.nativeElement
    });
    this.showCelebration = false;
  }

  loadInteractions() {
    if (this.celebrationCanvas && this.celebrationCanvas.nativeElement) {
      this.animationService.playAnimation({
        src: CanvasConstant.CELEBRATION,
        canvas: this.celebrationCanvas.nativeElement
      });
    }
    this.soundService.playSound(SoundConstant.CELEBRATION);
  }

  setPodium(data: QuizResult[]) {
    this.podiumList = [
      data[1],
      data[0],
      data[2]
    ];
  }

  getCssClass(index: number): string {
    return index === 1 ? 'first' : index === 0 ? 'second' : 'third'
  }


  loadSound() {
    this.soundService.loadSound(SoundConstant.CELEBRATION, {
      src: SoundConstantUrl.CELEBRATION,
      loop: false, volume: 2.0
    });
  }



  findLatestDate(dates: string[]): string {
    return dates
      .map(date => date.replace(`${StorageKeyConstant.quiz_result}_`, '')) // Remove the base key
      .reduce((latest, current) => {
        const currentDate = new Date(current);
        return currentDate > new Date(latest) ? current : latest;
      });
  }
  actionItems(event: DataTableActions) {
    console.log(event)
  }

  ngOnDestroy(): void {
      this.stopAnimation();
  }

}
