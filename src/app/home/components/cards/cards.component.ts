import { Component } from '@angular/core';
import { CardsConstant, CardsModel } from '../../../shared/constants/cards.constant';
import { Router } from '@angular/router';
import { TitleConstant } from '../../../shared/constants/title.constant';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  cardsList: CardsModel[] = CardsConstant;
  title = TitleConstant;
  constructor(private router: Router) {}

  onCardClick(data: CardsModel) {
    this.router.navigate(['/', data.path])
  }

}
