import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit {

  slides: Array<any> = [];

  constructor() {
  }

  ngAfterViewInit(): void {
    this.loadTinderCards();
  }

  loadTinderCards() {
    this.slides = this.slides.concat(this.getCards());
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
}
