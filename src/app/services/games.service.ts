import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GameDto {
  seasonYear: number;
  week: number;
  gameTimeUtc: string;
  homeTeamName: string;
  awayTeamName: string;
  locationName: string;
}

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private baseUrl = 'https://localhost:44360/api/Game/GetDtoByWeek';

  constructor(private http: HttpClient) {}

  getGamesByWeek(
    weekNumber: number,
    seasonYear: number = 2024
  ): Observable<GameDto[]> {
    const url = `${this.baseUrl}?week=${weekNumber}&seasonYear=${seasonYear}`;
    return this.http.get<GameDto[]>(url);
  }
}
