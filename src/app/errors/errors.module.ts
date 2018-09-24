import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ErrorsRoutingModule} from './errors-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {Page404Component} from './page404/page404.component';
import {Page403Component} from './page403/page403.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ErrorsRoutingModule
  ],
  declarations: [
    Page404Component,
    Page403Component,
  ],
  exports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ErrorsRoutingModule,
    Page404Component,
    Page403Component,
  ]
})
export class ErrorsModule {
}
