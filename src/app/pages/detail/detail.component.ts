import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/interfaces/card.interface'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  id!: string
  card$!: Observable<Card>

  constructor(private route: ActivatedRoute, private cardService: CardService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || ''
    console.log('El id: ', this.id)

    this.card$ = this.cardService.getCard(this.id).pipe(tap(console.log))
  }

}
