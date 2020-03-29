import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { BackendApiResponse } from '../model/backend-api-response';
import { User } from '../model/user';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  baseUrl = environment.backEndApiUrl;

  getCurrentUser(): Observable<BackendApiResponse<User>> {
    return this.http
      .get<BackendApiResponse<User>>(`${this.baseUrl}/user`)
      .pipe(
        take(1)
      );
  }
}


