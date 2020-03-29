import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { BackendApiResponse } from '../model/backend-api-response';
import { PageVisits } from '../model/page-visits';
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageVisitsService {

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


  getCharacterVisits(characterId: number): Observable<BackendApiResponse<PageVisits>> {
    return this.http
      .get<BackendApiResponse<PageVisits>>(`${this.baseUrl}/visits/character/${characterId}`)
      .pipe(
        take(1),
        catchError(this.handleError)
      );
  }
}
