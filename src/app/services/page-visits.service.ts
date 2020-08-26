import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { BackendApiResponse } from '../model/backend-api-response';
import { PageVisits } from '../model/page-visits';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageVisitsService {

  constructor(private http: HttpClient) {
  }

  baseUrl = environment.backEndApiUrl;

  getCharacterVisits(characterId: number): Observable<BackendApiResponse<PageVisits>> {
    return this.http
      .get<BackendApiResponse<PageVisits>>(`${this.baseUrl}/visits/character/${characterId}`)
      .pipe(
        take(1)
      );
  }
}
