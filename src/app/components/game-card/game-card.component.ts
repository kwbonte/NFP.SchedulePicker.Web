import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameDto } from '../../services/games.service';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
  @Input() game!: GameDto;
  @Output() pick = new EventEmitter<string>();

  selectedTeam: string | null = null;

  selectTeam(team: string) {
    this.selectedTeam = team;
    this.pick.emit(team);
  }

  /** Central time formatter for reuse */
  private getCentralTimeFormatter(
    options?: Intl.DateTimeFormatOptions
  ): Intl.DateTimeFormat {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      ...options,
    });
  }

  /** Game time formatted for display in Central Time */
  get gameTimeCst(): string {
    const utcDate = new Date(this.game.gameTimeUtc);
    return this.getCentralTimeFormatter({
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(utcDate);
  }

  /** Whether this game falls on a Thursday (in CST) */
  get isThursdayNight(): boolean {
    const utcDate = new Date(this.game.gameTimeUtc);
    const weekday = this.getCentralTimeFormatter({ weekday: 'long' }).format(
      utcDate
    );
    return weekday === 'Thursday';
  }

  /** Whether this game falls on a Monday (in CST) */
  get isMondayNight(): boolean {
    const utcDate = new Date(this.game.gameTimeUtc);
    const weekday = this.getCentralTimeFormatter({ weekday: 'long' }).format(
      utcDate
    );
    return weekday === 'Monday';
  }
}
