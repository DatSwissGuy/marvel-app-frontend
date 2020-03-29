import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendApiInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes(environment.backEndApiUrl.replace(/^http:\/\/|https:\/\/ /gi, ''))
    ) {
      return next.handle(request);
    }
    const requestClone = request.clone({
      withCredentials: true
    });
    return next.handle(requestClone);
  }
}
