import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthToken } from '../model/auth-token';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  baseUrl = environment.backEndApiUrl;
  clientId = environment.authClientId;
  clientSecret = environment.authClientSecret;

  getAccessTokenByLogin(username: string, password: string): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(`${this.baseUrl}/token`, {
        grant_type: 'password',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        username,
        password
      }).pipe(
        take(1)
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
  }

}



