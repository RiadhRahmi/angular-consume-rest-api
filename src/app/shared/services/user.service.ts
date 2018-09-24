import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private baseService: BaseService) {
  }

  checkUniqueEmail(email) {
    return this.baseService.postwithoutPipe('users/unique-email', {email: email});
  }

  getUsers(): Observable<any> {
    return this.baseService.get('users');
  }

  getUser(id) {
    return this.baseService.get('users/' + id);
  }

  createUser(user: any) {
    return this.baseService.post('users', user);
  }

  updateUser(user: any, idUser) {
    return this.baseService.post('users/' + idUser + '/update', user);
  }

  delete(users_id) {
    return this.baseService.post('users/delete', users_id);
  }


}
