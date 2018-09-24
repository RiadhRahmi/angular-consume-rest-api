import {Injectable} from '@angular/core';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private baseService: BaseService) {
  }


  get isLoggedIn() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return true;
    }
    return false;
  }

  get isAdmin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.role === 0) {
      return true;
    }
    return false;
  }

  get isEditor() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.role === 1) {
      return true;
    }
    return false;
  }

  login(email: string, password: string) {
    return this.baseService.post('login', {email: email, password: password});
  }


  register(user: any) {
    return this.baseService.post('register', user);
  }

  logout() {
    return this.baseService.get('logout');
  }

}
