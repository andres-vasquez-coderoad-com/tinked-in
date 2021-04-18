import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  EventEmitter,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-tinder-ui',
  templateUrl: './tinder-ui.component.html',
  styleUrls: ['./tinder-ui.component.scss'],
})
export class TinderUiComponent implements OnChanges, AfterViewInit {
  // Ref: https://betterprogramming.pub/tinder-like-swiper-ui-for-angular-ionic-4-50c401d6b9fb
  @Input('cards') cards: Array<{
    img: string,
    title: string,
    description: string
  }>;

  originalCards: Array<any> = [];
  currentPosition = 0;

  @ViewChildren('tinderCard') tinderCards: QueryList<ElementRef>;

  tinderCardsArray: Array<ElementRef>;

  moveOutWidth: number; // value in pixels that a card needs to travel to dissapear from screen
  shiftRequired: boolean; // state variable that indicates we need to remove the top card of the stack
  transitionInProgress: boolean; // state variable that indicates currently there is transition on-going
  heartVisible: boolean;
  crossVisible: boolean;

  @Output() choiceMade = new EventEmitter();

  constructor(private renderer: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentPosition = 0;
    this.originalCards = this.cards;
  }

  ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
    this.tinderCardsArray = this.tinderCards.toArray();
    this.tinderCards.changes.subscribe(() => {
      this.tinderCardsArray = this.tinderCards.toArray();
    });
  }

  moreInfo(event) {
    event.preventDefault();
  }

  userClickedButton(event, heart) {
    event.preventDefault();
    if (!this.cards.length) {
      return false;
    }
    if (heart) {
      this.tinderCardsArray[0].nativeElement.style.transform = 'translate(' + this.moveOutWidth + 'px, -100px) rotate(-30deg)';
      this.toggleChoiceIndicator(false, true);
    } else {
      this.tinderCardsArray[0].nativeElement.style.transform = 'translate(-' + this.moveOutWidth + 'px, -100px) rotate(30deg)';
      this.toggleChoiceIndicator(true, false);
    }
    this.shiftRequired = true;
    this.transitionInProgress = true;
  }

  toggleChoiceIndicator(cross, heart) {
    this.crossVisible = cross;
    this.heartVisible = heart;
  }

  handleShift() {
    this.transitionInProgress = false;
    this.toggleChoiceIndicator(false, false);
    if (this.shiftRequired) {
      this.shiftRequired = false;
    }
  }

  handleUnshift() {
    this.transitionInProgress = false;
    this.toggleChoiceIndicator(false, false);
    if (this.shiftRequired) {
      this.shiftRequired = false;
    }
  }

  // Start tracking movement
  handlePan(event) {
    if (event.deltaX === 0 || (event.center.x === 0 && event.center.y === 0) || !this.cards.length) {
      return;
    }

    if (this.transitionInProgress) {
      this.handleShift();
    }

    this.renderer.addClass(this.tinderCardsArray[0].nativeElement, 'moving');
    if (Math.abs(event.deltaX) > 50) {
      if (event.deltaX > 0) {
        this.toggleChoiceIndicator(false, true);
      }
      if (event.deltaX < 0) {
        this.toggleChoiceIndicator(true, false);
      }
    }
    const xMulti = event.deltaX * 0.03;
    const yMulti = event.deltaY / 80;
    const rotate = xMulti * yMulti;
    this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)');
    this.shiftRequired = true;
  }

  // End tracking movement
  handlePanEnd(event) {
    this.toggleChoiceIndicator(false, false);

    if (!this.cards.length) {
      return;
    }
    this.renderer.removeClass(this.tinderCardsArray[0].nativeElement, 'moving');

    const keep = Math.abs(event.deltaX) < 100 && Math.abs(event.deltaY) < 100;
    if (keep) {
      this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', '');
      this.shiftRequired = false;
    } else if (Math.abs(event.velocityX) > 0.5) {
      if (event.deltaX > 20) {
        this.like(this.cards[0]);
      } else {
        this.dontLike(this.cards[0]);
      }
      this.next(event);
    } else {
      if (event.deltaY > 20) {
        this.passed(this.cards[0]);
        this.next(event);
      } else {
        this.previous(event);
      }
    }
    this.transitionInProgress = true;
  }

  next(event) {
    this.cards.shift();
    this.currentPosition++;

    const endX = Math.max(Math.abs(event.velocityX) * this.moveOutWidth, this.moveOutWidth);
    const toX = event.deltaX > 0 ? endX : -endX;
    const endY = Math.abs(event.velocityY) * this.moveOutWidth;
    const toY = event.deltaY > 0 ? endY : -endY;
    const xMulti = event.deltaX * 0.03;
    const yMulti = event.deltaY / 80;
    const rotate = xMulti * yMulti;
    this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)');
    this.shiftRequired = true;
  }

  previous(event) {
    if (this.currentPosition > 0) {
      this.currentPosition--;
      const previousCard = this.originalCards[this.currentPosition];
      this.cards.unshift(previousCard);
    }
  }

  like(card) {

  }

  dontLike(card) {

  }

  passed(card) {

  }
}
