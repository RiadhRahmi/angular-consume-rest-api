import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  showAlert = false;
  alert: any = {};

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.angForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const email = this.angForm.value.email;
    const password = this.angForm.value.password;
    this.authService.login(email, password).subscribe((data: any) => {
      if (data['status'] === 200) {
        localStorage.setItem('currentUser', JSON.stringify(data['data']));
        return this.router.navigate(['/home']);
      } else {
        this.showAlert = true;
        this.alert.type = 'danger';
        this.alert.message = 'failed operation';
      }
    });
  }

}
