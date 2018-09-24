import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateArticleComponent} from './create-article/create-article.component';
import {EditArticleComponent} from './edit-article/edit-article.component';
import {ShowArticleComponent} from './show-article/show-article.component';
import {ListArticleComponent} from './list-article/list-article.component';
import {ArticlesComponent} from './articles.component';
import {RoleGuard} from '../shared/guards/role.guard';
import {AuthGuard} from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: ListArticleComponent,
    data: {
      breadcrumb: 'List Articles'
    },
    canActivate: [AuthGuard]
  },
  {
    path: '', component: ArticlesComponent,
    data: {
      breadcrumb: 'Articles'
    },
    canActivateChild: [AuthGuard]
    ,
    children: [
      {
        path: 'ajouter', component: CreateArticleComponent,
        data: {
          breadcrumb: 'Add article'
        }
      },
      {
        path: ':id/edit', component: EditArticleComponent, pathMatch: 'full',
        canActivate: [RoleGuard],
        data: {
          breadcrumb: 'Edit article',
          role: 'admin'
        }
      },
      {
        path: ':id/show', component: ShowArticleComponent,
        data: {
          breadcrumb: 'Show article'
        }
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule {
}
