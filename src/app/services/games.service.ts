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
  private apiUrl =
    'https://localhost:44360/api/Game/GetDtoByWeek?week=1&seasonYear=2024';

  constructor(private http: HttpClient) {}

  getWeek1Games(): Observable<GameDto[]> {
    return this.http.get<GameDto[]>(this.apiUrl);
  }
}
