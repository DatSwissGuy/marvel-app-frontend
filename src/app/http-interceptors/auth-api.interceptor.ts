import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAuthToken } from '../reducers';
import { catchError, first, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthApiInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes(environment.backEndApiUrl.replace(/^http:\/\/|https:\/\/ /gi, ''))
    ) {
      return next.handle(request);
    }

    return this.store.select(getAuthToken).pipe(
      first(),
      switchMap(authToken => {
        if (authToken) {
          const requestClone = request.clone({
            setHeaders: {Authorization: `${authToken.token_type} ${authToken.access_token}`}
          });
          return next.handle(requestClone).pipe(catchError(error => this.handle401Error(error)));
        }
        return next.handle(request);
      })
    );
  }

  private handle401Error(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (error.status === 401) {
      this.router.navigate(['login']);
    }
    return of();
  }
}
