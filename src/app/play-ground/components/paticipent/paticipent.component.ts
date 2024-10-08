import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CardColors } from '../../constants/cards-colors.constant';
import { SoundService } from '../../../shared/services/sound.service';
import { NumberConstant } from '../../../shared/constants/number-constant';
import { SoundConstant, SoundConstantUrl } from '../../constants/interation-effects';
import Emitter from 'quill/core/emitter';
import { TitleConstant } from '../../../shared/constants/title.constant';

@Component({
  selector: 'app-paticipent',
  templateUrl: './paticipent.component.html',
  styleUrl: './paticipent.component.scss'
})
export class PaticipentComponent {
  @Input() studentName!: any;
  cards = CardColors.colors;
  title = TitleConstant
  @Output() cardEmitter = new EventEmitter<number>();

  constructor(private soundService: SoundService) {
    // this.loadSounds();
  }

  ngOnChanges(changes: SimpleChanges): void { }

  ngOnInit(): void { }

  getCard(i: number): string {
    return `card${i}`
  }


  onCardClick(i: number) {
    this.cardEmitter.emit(i);
    // this.soundService.playSound(SoundConstant.CARD_CLICK);
    // setTimeout(() => {
    //   this.soundService.stopSound(SoundConstant.CARD_CLICK);
    // }, NumberConstant.THREE_THOUSAND);
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
    this.soundService.loadSound(SoundConstant.CARD_CLICK, {
      src: SoundConstantUrl.CARD_CLICK,
      autoplay: false, loop: false, volume: 3.0
    })
  }

  ngOnDestroy(): void {

  }

}
