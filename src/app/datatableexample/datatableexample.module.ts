import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DatatableexampleRoutingModule} from './datatableexample-routing.module';
import {RouterModule} from '@angular/router';
import {DatatableexampleComponent} from './datatableexample.component';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DataTablesModule.forRoot(),
    DatatableexampleRoutingModule
  ],
  declarations: [
    DatatableexampleComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    DatatableexampleRoutingModule,
    DatatableexampleComponent
  ],
  providers: [
    DataTablesModule
  ]
})
export class DatatableexampleModule {
}
