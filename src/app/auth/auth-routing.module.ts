import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfilComponent} from './profil/profil.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {RegisterComponent} from './register/register.component';
import {IsAuthGuard} from '../shared/guards/isauth.guard';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: 'profil', component: ProfilComponent,
    data: {
      breadcrumb: 'My Profil'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'register', component: RegisterComponent,
    data: {
      breadcrumb: 'Register'
    },
    canActivate: [IsAuthGuard]
  },
  {
    path: 'login', component: LoginComponent,
    data: {
      breadcrumb: 'Login'
    },
    canActivate: [IsAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
