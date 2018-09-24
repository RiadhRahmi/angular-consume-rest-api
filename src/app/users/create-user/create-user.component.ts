import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {Subscription} from 'rxjs';
import {uniqueEmailValidator} from '../../shared/directives/unique-email-validator.directive';
import {User} from '../../shared/models/User';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit, OnDestroy {
  pagetitle = 'Add User';
  angForm: FormGroup;
  showAlert = false;
  alert: any = {};
  subcribtion = new Subscription();
  person = new User();
  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email], [uniqueEmailValidator(this.userService)]],
      password: ['', [Validators.required, Validators.min(10)]],
      role: [null],
    });
  }


  get name() {
    return this.angForm.get('name');
  }

  get email() {
    return this.angForm.get('email');
  }

  get password() {
    return this.angForm.get('password');
  }


  createUser() {
    const user = this.angForm.value;
    this.subcribtion = this.userService.createUser(user).subscribe(
      data => {
        if (data['status'] === 201) {
          this.router.navigate(['users']);
        } else {
          this.showAlert = true;
          this.alert.type = 'danger';
          this.alert.message = data['data'][0];
        }
      },
      error => {
        this.showAlert = true;
        this.alert.type = 'danger';
        this.alert.message = 'failed operation';
      });
  }

  ngOnDestroy(): void {
    this.subcribtion.unsubscribe();
  }

}


export function valideEmail(): ValidatorFn {
  return (control: AbstractControl): any => {
    const email = control.value;
    return email === 'rahmiriadh@gmail.com' ? null : {'uniqueEmail': true};
  };
}
