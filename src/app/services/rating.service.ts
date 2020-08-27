import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BackendApiResponse } from '../model/backend-api-response';
import { CharacterRating } from '../model/character-rating';
import { AverageCharacterRating } from '../model/average-character-rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) {
  }

  baseUrl = environment.backEndApiUrl;

  getAverageCharacterRating(characterId: number): Observable<BackendApiResponse<AverageCharacterRating>> {
    return this.http
      .get<BackendApiResponse<AverageCharacterRating>>(`${this.baseUrl}/ratings/character/${characterId}/average`)
      .pipe(
        take(1)
      );
  }

  getUserCharacterRating(characterId: number): Observable<BackendApiResponse<CharacterRating>> {
    return this.http
      .get<BackendApiResponse<CharacterRating>>(`${this.baseUrl}/ratings/character/${characterId}`)
      .pipe(
        take(1)
      );
  }

  updateUserCharacterRating(ratingId: number, userRating: number): Observable<BackendApiResponse<CharacterRating>> {
    return this.http
      .put<BackendApiResponse<CharacterRating>>(`${this.baseUrl}/ratings/${ratingId}`, {
        rating: `${userRating}`,
      })
  }

  postUserCharacterRating(characterId: number, userRating: number): Observable<BackendApiResponse<CharacterRating>> {
    return this.http
      .post<BackendApiResponse<CharacterRating>>(`${this.baseUrl}/ratings`, {
        character_id: `${characterId}`,
        rating: `${userRating}`
      })
  }

  deleteUserCharacterRating(ratingId: number): Observable<BackendApiResponse<CharacterRating>> {
    return this.http
      .delete<BackendApiResponse<CharacterRating>>(`${this.baseUrl}/ratings/${ratingId}`)
  }

}
