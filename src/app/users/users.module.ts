import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {UsersComponent} from './users.component';
import {ListUserComponent} from './list-user/list-user.component';
import {ShowUserComponent} from './show-user/show-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {CreateUserComponent} from './create-user/create-user.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    SharedModule

  ],
  declarations: [
    UsersComponent,
    ListUserComponent,
    ShowUserComponent,
    EditUserComponent,
    CreateUserComponent,
  ]
  ,
  exports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    SharedModule,
    UsersComponent,
    ListUserComponent,
    ShowUserComponent,
    EditUserComponent,
    CreateUserComponent,
  ],
  providers: [
    NgbActiveModal,
  ]
})
export class UsersModule {
}
