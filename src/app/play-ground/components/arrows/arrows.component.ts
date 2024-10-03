import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizNaviationEnum, QuizNavigationArrowEnum, QuizNavigationStatus } from '../../model/quiz-navigation.model';

@Component({
  selector: 'app-arrows',
  templateUrl: './arrows.component.html',
  styleUrl: './arrows.component.scss'
})
export class ArrowsComponent {
  @Input() forwardArrow!: boolean;
  @Input() backWardArow!: boolean;
  @Input() navigationStatus!: QuizNavigationStatus;

  arrowEnum = QuizNavigationArrowEnum;

  @Output() emitArrow = new EventEmitter<QuizNavigationArrowEnum>();


  onArrowClick(arrow: QuizNavigationArrowEnum) {
    this.emitArrow.emit(arrow);
  }

}
