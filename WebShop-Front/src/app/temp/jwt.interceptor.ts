import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { UserService } from '../services/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {  
  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const helper = new JwtHelperService();
    let currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser && currentUser.token) {
        if(helper.isTokenExpired(currentUser.token)){
          alert("Vaša sesija je istekla. Prijavite se ponovo.");
          this.userService.userLogout();
        }
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.token}`
            }
        });
    }
    return next.handle(request);
  }
}
