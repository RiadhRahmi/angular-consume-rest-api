import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {uniqueEmailValidator} from '../../shared/directives/unique-email-validator.directive';
import {UserService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  pagetitle = 'Register';
  angForm: FormGroup;
  showAlert = false;
  alert: any = {};
  subcribtion = new Subscription();

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email], [uniqueEmailValidator(this.userService)]],
      password: ['', [Validators.required, Validators.min(10)]],
      c_password: ['', [Validators.required, Validators.min(10)]],
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

  get c_password() {
    return this.angForm.get('c_password');
  }


  register() {
    const user = this.angForm.value;
    this.subcribtion = this.authService.register(user).subscribe(
      data => {
        if (data['status'] === 201) {

          localStorage.setItem('currentUser', JSON.stringify(data['data']));
          return this.router.navigate(['/home']);

        } else {
          this.showAlert = true;
          this.alert.type = 'danger';
          this.alert.message = 'failed operation';
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
