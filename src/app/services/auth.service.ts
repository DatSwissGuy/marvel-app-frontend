import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { AuthToken } from '../model/auth-token';
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  baseUrl = environment.backEndApiUrl;
  clientId = environment.authClientId;
  clientSecret = environment.authClientSecret;

  // TODO outsource error handling as a service
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else if (error.status === 0) {
      console.error(`Backend unreachable / offline, returned code: ${error.status}`);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  getAccessTokenByLogin(username: string, password: string): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(`${this.baseUrl}/token`, {
        grant_type: 'password',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        username,
        password
      }).pipe(
        take(1),
        catchError(this.handleError)
      );
  }

  logoutFromBackend(): Observable<AuthToken> {
    const headers = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Application: 'Marvel-App'
      })
    };
    return this.http
      .post<AuthToken>(`${this.baseUrl}/logout`, null, headers)
      .pipe(
        catchError(this.handleError)
      );
  }

}



