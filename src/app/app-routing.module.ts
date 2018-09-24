import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './core/dashboard/dashboard.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {RoleGuard} from './shared/guards/role.guard';
import {Page404Component} from './errors/page404/page404.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    data: {
      breadcrumb: 'Home'
    },
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: '',
    loadChildren: './errors/errors.module#ErrorsModule',
  },
  {
    path: 'articles',
    loadChildren: './articles/articles.module#ArticlesModule',
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
    canActivate: [AuthGuard, RoleGuard],
    data: {
      role: 'admin',
    }
  },
  {
    path: 'datatable',
    loadChildren: './datatableexample/datatableexample.module#DatatableexampleModule',
    canActivate: [AuthGuard],
  },
  {
    path: '**', redirectTo: 'page-not-found', pathMatch: 'full',
    data: {
      breadcrumb: 'Page 404'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
