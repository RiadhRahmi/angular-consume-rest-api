import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(public authService: AuthService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      // if (route.url[0].path === 'login' || route.url[0].path === 'register') {
      //   this.router.navigate(['/home']);
      //   return false;
      // }
      return true;
    } else {
      // if (route.url[0].path === 'login' || route.url[0].path === 'register') {
      //   return true;
      // }
      this.router.navigate(['/login']);
      return false;
    }

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
