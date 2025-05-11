import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { GamesService, GameDto } from './services/games.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Pick Week 1 - 2024';
  games: GameDto[] = [];

  constructor(private gamesService: GamesService) {}

  ngOnInit() {
    this.gamesService.getWeek1Games().subscribe((data) => {
      this.games = data;
      console.log('this.games', this.games);
    });
  }
}
