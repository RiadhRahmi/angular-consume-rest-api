import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Page403Component} from './page403/page403.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {Page404Component} from './page404/page404.component';

const routes: Routes = [
  {
    path: 'access-denied', component: Page403Component,
    data: {
      breadcrumb: 'Access Denied'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'page-not-found', component: Page404Component,
    data: {
      breadcrumb: 'Page 404'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule {
}
