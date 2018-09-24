import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {User} from '../../shared/models/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {
  @Input() user;
  subcribtion = new Subscription();
  person = new User();
  isPassword = true;
  userRole;

  // @Output() updatedUser = new EventEmitter<any>();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  update(name, email, password) {
    this.user.name = name;
    this.user.email = email;
    this.user.password = password;
    this.user.role = this.userRole !== undefined ? this.userRole : this.user.role;
    this.subcribtion = this.userService.updateUser(this.user, this.user.id).subscribe(
      data => {
        // this.updatedUser.emit(data['data']);
      },
      error => {
        console.log('failed operation');
      });
  }

  togglePassword() {
    this.isPassword = !this.isPassword;
  }

  ngOnDestroy(): void {
    this.subcribtion.unsubscribe();
  }

}
