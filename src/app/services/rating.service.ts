import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
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

  // TODO outsource error handling as a service
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error ocurred:', error.error.message);
    } else if (error.status === 0) {
      console.error(`Backend unreachable / offline, returned code: ${error.status}`);
    } else {
      console.error(
        `Marvel-App-Backend returned code: ${error.status} ${error.statusText}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  getAverageCharacterRating(characterId: number): Observable<BackendApiResponse<AverageCharacterRating>> {
    return this.http
      .get<BackendApiResponse<AverageCharacterRating>>(`${this.baseUrl}/ratings/character/${characterId}/average`)
      .pipe(
        take(1),
        catchError(this.handleError)
      );
  }

  getUserCharacterRating(characterId: number): Observable<BackendApiResponse<CharacterRating>> {
    return this.http
      .get<BackendApiResponse<CharacterRating>>(`${this.baseUrl}/ratings/character/${characterId}`)
      .pipe(
        take(1),
        catchError(this.handleError)
      );
  }

  updateUserCharacterRating(ratingId: number, userRating: number): Observable<BackendApiResponse<CharacterRating>> {
    return this.http
      .put<BackendApiResponse<CharacterRating>>(`${this.baseUrl}/ratings/${ratingId}`, {
        rating: `${userRating}`,
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  postUserCharacterRating(characterId: number, userRating: number): Observable<BackendApiResponse<CharacterRating>> {
    return this.http
      .post<BackendApiResponse<CharacterRating>>(`${this.baseUrl}/ratings`, {
        character_id: `${characterId}`,
        rating: `${userRating}`
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteUserCharacterRating(ratingId: number): Observable<BackendApiResponse<CharacterRating>> {
    return this.http
      .delete<BackendApiResponse<CharacterRating>>(`${this.baseUrl}/ratings/${ratingId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

}
