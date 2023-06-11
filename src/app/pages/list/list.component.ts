import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

import { Card } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent {

  cards: Card[] = []
  offset = 0

  cardTextFC = new FormControl('Frog')

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardTextFC.valueChanges.pipe(debounceTime(1000))
    .subscribe(res => {
      console.log(res)
      this.cards = []
      this.searchCards(res)
    })
    this.searchCards()
  }

  onScroll() {
    console.log("scrolled!!");
    this.offset += 100
    this.searchCards()
  }

  searchCards(cardName: string | null = null) {
    this.cardService.getCards(cardName, this.offset).subscribe(res => {
      console.log(res)
      this.cards = [...this.cards, ...res]
    })
  }
}
