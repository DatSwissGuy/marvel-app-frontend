import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpsInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const secureRequest = request.clone({
      // TODO http -> https
      url: request.url.replace('http://', 'http://')
    });
    return next.handle(secureRequest);
  }
}
