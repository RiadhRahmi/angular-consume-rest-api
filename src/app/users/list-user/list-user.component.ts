import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ExcelService} from '../../shared/services/excel.service';
import {UserService} from '../../shared/services/user.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {User} from '../../shared/models/User';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, OnDestroy {
  pagetitle = 'Liste des users';
  users: any[];
  subcribtion = new Subscription();
  showAlert = false;
  alert: any = {};
  selectedUser = null;
  person = new User();
  form: FormGroup;

  constructor(private userService: UserService,
              private excelService: ExcelService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getUsers();
  }

  createForm() {
    const controls = this.users.map(c => new FormControl(false));
    this.form = this.formBuilder.group({
      roles: new FormArray(controls)
    });
  }


  getUsers() {
    this.subcribtion = this.userService
      .getUsers()
      .subscribe(
        data => {
          this.users = data['data'];
          this.createForm();
        },
        error => {
          this.showAlert = true;
          this.alert.type = 'danger';
          this.alert.message = 'failed operation';
        });
  }


  delete(id) {
    if (confirm('are you sure you want do delete this user ?')) {
      const users_id = {users_id: [id]};
      this.deleteUsers(users_id);
    }
  }


  selectAll() {
    const controlArray = <FormArray> this.form.get('roles');
    for (let i = 0; i < this.users.length; i++) {
      controlArray.controls[i].setValue(true);
    }
  }

  unSelectAll() {
    const controlArray = <FormArray> this.form.get('roles');
    for (let i = 0; i < this.users.length; i++) {
      controlArray.controls[i].setValue(false);
    }
  }

  deleteAll() {
    if (confirm('are you sure you want do delete these users ?')) {
      const users_id = this.form.value.roles
        .map((v, i) => v ? this.users[i].id : null)
        .filter(v => v !== null);
      const usersId = {users_id: users_id};
      this.deleteUsers(usersId);
    }

  }


  deleteUsers(usersId) {
    this.subcribtion = this.userService
      .delete(usersId)
      .subscribe(
        data => {
          this.getUsers();
          this.showAlert = true;
          this.alert.type = 'success';
          this.alert.message = 'successful operation';
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
