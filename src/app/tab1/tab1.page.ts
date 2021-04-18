import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit {

  cards;

  constructor() {
    this.cards = [];
  }

  loadTinderCards() {
    this.cards = this.cards.concat(this.getCards());
    this.cards = this.cards.concat(this.getCards());
    this.cards = this.cards.concat(this.getCards());
  }

  getCards() {
    return [
      {
        img: 'https://placeimg.com/300/300/people',
        title: 'Demo card 1',
        description: 'This is a demo for Tinder like swipe cards'
      },
      {
        img: 'https://placeimg.com/300/300/animals',
        title: 'Demo card 2',
        description: 'This is a demo for Tinder like swipe cards'
      },
      {
        img: 'https://placeimg.com/300/300/nature',
        title: 'Demo card 3',
        description: 'This is a demo for Tinder like swipe cards'
      },
      {
        img: 'https://placeimg.com/300/300/tech',
        title: 'Demo card 4',
        description: 'This is a demo for Tinder like swipe cards'
      },
      {
        img: 'https://placeimg.com/300/300/arch',
        title: 'Demo card 5',
        description: 'This is a demo for Tinder like swipe cards'
      }
    ];
  }

  ngAfterViewInit(): void {
    this.loadTinderCards();
  }
}
