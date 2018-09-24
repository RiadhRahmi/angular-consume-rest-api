import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {FooterComponent} from './footer/footer.component';
import {SharedModule} from '../shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreRoutingModule
  ],
  declarations: [
    DashboardComponent,
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    CoreRoutingModule,
    DashboardComponent,
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent,
  ]
})
export class CoreModule {
}
