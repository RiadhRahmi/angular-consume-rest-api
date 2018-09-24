import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

    const roles = ['admin', 'editor'];

    const role = route.data.role;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      if (roles[currentUser.role] === role) {
        return true;
      }
    }

    this.router.navigate(['/access-denied']);
    return false;


  }
}
