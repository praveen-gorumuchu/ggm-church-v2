
import { Component } from '@angular/core';
import { CardsConstant, CardsModel } from '../../../shared/constants/cards.constant';
import { Route, Router } from '@angular/router';
import { TitleConstant } from '../../../shared/constants/title.constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cardsList: CardsModel[] = CardsConstant;
  title = TitleConstant.homePageTitle;
  title2 = TitleConstant.homePageTitle2;
  subTitle = TitleConstant.homePageDes;

  constructor(private router: Router) { }

  onCardClick(data: CardsModel) {
    this.router.navigate(['/', data.path])
  }

  onScroll(event: any) {
    const scrollTop = event.target.scrollTop;
    const header = document.getElementById('app-header');
    if (header) {
      if (scrollTop > 320) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }
  }
}
