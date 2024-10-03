import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CardColors } from '../../constants/cards-colors.constant';
import { SoundService } from '../../../shared/services/sound.service';
import { NumberConstant } from '../../../shared/constants/number-constant';
import { SoundConstant, SoundConstantUrl } from '../../constants/interation-effects';
import Emitter from 'quill/core/emitter';

@Component({
  selector: 'app-paticipent',
  templateUrl: './paticipent.component.html',
  styleUrl: './paticipent.component.scss'
})
export class PaticipentComponent {
  @Input() studentName!: any;
  cards = CardColors.colors;
  @Output() cardEmitter = new EventEmitter<number>();
  
  constructor(private soundService: SoundService) {
    this.loadSounds();
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {}

  getCard(i: number): string {
    return `card${i}`
  }


  onCardClick(i: number) {
    this.cardEmitter.emit(i);
    this.soundService.playSound(SoundConstant.CARD_CLICK);
    setTimeout(() => {
      this.soundService.stopSound(SoundConstant.CARD_CLICK);
    }, NumberConstant.TWO_THOUSAND);
  }

  getCardStyles(index: number): { [key: string]: string } {
    return {
      backgroundColor: this.cards[index]
    }
  }

  getStudentId(num: string): string {
    return `${parseInt(num, 10)}`
  }

  loadSounds() {
    this.soundService.loadSound(SoundConstant.CARD_CLICK, SoundConstantUrl.CARD_CLICK)
    this.soundService.loadSound(SoundConstant.CARD_CLICK, SoundConstantUrl.CARD_CLICK)
  }

  ngOnDestroy(): void {

  }

}
