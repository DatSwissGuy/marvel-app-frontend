import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { BackendApiResponse } from '../model/backend-api-response';
import { Favorite } from '../model/favorite';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient) {
  }

  baseUrl = environment.backEndApiUrl;

  getUserFavorites(): Observable<BackendApiResponse<Favorite[]>> {
    return this.http
      .get<BackendApiResponse<Favorite[]>>(`${this.baseUrl}/favorites`)
      .pipe(
        take(1)
      );
  }

  deleteUserFavorite(favoriteId: number): Observable<BackendApiResponse<Favorite>> {
    return this.http
      .delete<BackendApiResponse<Favorite>>(`${this.baseUrl}/favorites/${favoriteId}`);
  }

  postUserFavorite(characterId: number, characterName: string, imageUrl: string): Observable<BackendApiResponse<Favorite>> {
    return this.http
      .post<BackendApiResponse<Favorite>>(`${this.baseUrl}/favorites`, {
        character_id: `${characterId}`,
        character_name: `${characterName}`,
        image_url: `${imageUrl}`
      });
  }
}
