import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RequestHttp, SuccessHttp } from '../actions/marvel.actions';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {

  requestCount = 0;

  constructor(
    private store: Store<any>
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requestCount++;
    this.store.dispatch(new RequestHttp());
    return next.handle(request).pipe(
      finalize(() => {
          this.requestCount--;
          if (this.requestCount === 0) {
            this.store.dispatch(new SuccessHttp());
          }
        }
      )
    );
  }
}
