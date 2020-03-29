import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelApiInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes(
      environment.marvelApiUrl.replace(/^http:\/\/|https:\/\/ /gi, '')
    )) {
      return next.handle(request);
    }

    const requestClone = request.clone({
      setParams: {
        ts: environment.timeStamp,
        apikey: environment.apiPublicKey,
        hash: environment.hash,
      }
    });
    return next.handle(requestClone);
  }
}
