import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { GamesService, GameDto } from './services/games.service';
import { GameCardComponent } from './components/game-card/game-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameCardComponent, NgIf, NgFor],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Pick Week 1 - 2024';
  games: GameDto[] = [];

  constructor(private gamesService: GamesService) {}

  ngOnInit() {
    this.gamesService.getGamesByWeek(1).subscribe((data) => {
      this.games = data;
      console.log('this.games', this.games);
    });
  }

  onPick(teamName: string, game: GameDto) {
    console.log(`You picked ${teamName} to win:`, game);
  }
}
