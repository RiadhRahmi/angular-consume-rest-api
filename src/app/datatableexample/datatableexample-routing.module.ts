import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DatatableexampleComponent} from './datatableexample.component';

const routes: Routes = [
  {
    path: '', component: DatatableexampleComponent,
    data: {
      breadcrumb: 'Example DataTable'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatatableexampleRoutingModule { }
