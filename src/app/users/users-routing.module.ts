import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListUserComponent} from './list-user/list-user.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {UsersComponent} from './users.component';

const routes: Routes = [
  {
    path: '', component: ListUserComponent,
    data: {
      breadcrumb: 'List Users'
    }
  },
  {
    path: '', component: UsersComponent,
    data: {
      breadcrumb: 'Users'
    },
    children: [
      {
        path: 'add', component: CreateUserComponent,
        data: {
          breadcrumb: 'Add user'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
