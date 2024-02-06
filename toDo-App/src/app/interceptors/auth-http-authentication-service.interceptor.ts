import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHttpAuthenticationServiceInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if(sessionStorage.getItem('username') && sessionStorage.getItem('token')){
      req =req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token') || ''
        }
      })
    }
    return next.handle(req);
  }
}
