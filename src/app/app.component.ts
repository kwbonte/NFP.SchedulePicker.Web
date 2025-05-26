import { Component, OnInit } from '@angular/core';
import { GamesService, GameDto } from './services/games.service';
import { GameCardComponent } from './components/game-card/game-card.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, NgFor, GameCardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Pick Week 1 - 2024';
  games: GameDto[] = [];
  selectedWeek = 1;
  allWeeks = Array.from({ length: 18 }, (_, i) => i + 1);

  constructor(private gamesService: GamesService) {}

  ngOnInit() {
    this.loadGames(this.selectedWeek);
  }

  loadGames(week: number) {
    this.selectedWeek = week;
    this.title = `Pick Week ${week} - 2024`;
    this.gamesService.getGamesByWeek(week).subscribe((data) => {
      this.games = data;
    });
  }

  onPick(team: string, game: GameDto) {
    console.log(`Picked ${team} to win`, game);
  }
}
