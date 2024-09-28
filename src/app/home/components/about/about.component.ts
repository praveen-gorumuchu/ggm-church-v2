import { Component, OnInit } from '@angular/core';
import { CardsConstant, CardsModel } from '../../../shared/constants/cards.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {

    
  }


}
