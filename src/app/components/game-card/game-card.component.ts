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

  /** Game time formatted for display in Central Time */
  get gameTimeCst(): string {
    const utcDate = new Date(this.game.gameTimeUtc + 'Z');
    return utcDate.toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      dateStyle: 'short',
      timeStyle: 'short',
    });
  }

  /** Whether this game falls on a Thursday (in Central Time) */
  get isThursdayNight(): boolean {
    const utcDate = new Date(this.game.gameTimeUtc + 'Z');
    const weekday = utcDate.toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      weekday: 'long',
    });
    return weekday === 'Thursday';
  }

  get isSaturdayNight(): boolean {
    const utcDate = new Date(this.game.gameTimeUtc + 'Z');

    const cdtDate = new Date(
      utcDate.toLocaleString('en-US', { timeZone: 'America/Chicago' })
    );

    const weekday = cdtDate.toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      weekday: 'long',
    });

    const hour = cdtDate.getHours();

    return weekday === 'Saturday' && hour >= 19;
  }

  get isSundayNight(): boolean {
    const utcDate = new Date(this.game.gameTimeUtc + 'Z');

    const cdtDate = new Date(
      utcDate.toLocaleString('en-US', { timeZone: 'America/Chicago' })
    );

    const weekday = cdtDate.toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      weekday: 'long',
    });

    const hour = cdtDate.getHours();

    return weekday === 'Sunday' && hour >= 19;
  }
  /** Whether this game falls on a Monday (in Central Time) */
  get isMondayNight(): boolean {
    const utcDate = new Date(this.game.gameTimeUtc + 'Z');
    const weekday = utcDate.toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      weekday: 'long',
    });
    return weekday === 'Monday';
  }

  /** Day of the week this game is scheduled, in Central Time */
  get gameDayNameCst(): string {
    const utcDate = new Date(this.game.gameTimeUtc + 'Z');

    const weekday = utcDate.toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      weekday: 'long',
    });

    const date = utcDate.toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      month: 'short',
      day: 'numeric',
    });

    const time = utcDate.toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return `${weekday}, ${date} at ${time}`;
  }
}
