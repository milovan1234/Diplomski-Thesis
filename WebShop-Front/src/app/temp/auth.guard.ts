import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public userService: UserService,
    private router: Router) { }

  canActivate(): boolean {
    if (this.userService.isLogin) {
      this.router.navigate(['/home'])
      return false;
    }
    return true;
  }

}
