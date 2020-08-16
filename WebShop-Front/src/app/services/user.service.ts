import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isLogin: boolean;
  public user: User;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.isLogin = localStorage.getItem("user") != null;
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  userLogin(email: string, password: string) : Observable<User> {
    return this.http.post<User>(`http://localhost:56123/api/users/authenticate`, { email, password }).pipe(map(data => {
      localStorage.setItem('user', JSON.stringify(data));
      this.isLogin = true;
      this.user = JSON.parse(localStorage.getItem("user"));
      return data;
    }));;
  }

  userRegister(firstName: string, 
               lastName: string, 
               email: string, 
               password: string, 
               phoneNumber: string)
  {
    return this.http.post<User>(`http://localhost:56123/api/users/register`, { 
      firstName,
      lastName,
      email,
      password,
      phoneNumber
    });
  }

  userLogout(): void {
    localStorage.clear();
    this.isLogin = false;
  }

}
