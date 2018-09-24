import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRoutingModule } from './articles-routing.module';

import {ArticlesComponent} from './articles.component';
import {ListArticleComponent} from './list-article/list-article.component';
import {EditArticleComponent} from './edit-article/edit-article.component';
import {CreateArticleComponent} from './create-article/create-article.component';
import {ShowArticleComponent} from './show-article/show-article.component';
import {NgbActiveModal, NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PDFExportModule} from '@progress/kendo-angular-pdf-export';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {NgbDateFRParserFormatter} from '../shared/services/ngb-date-fr-parser-formatter';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    PDFExportModule,
    FormsModule,
    ReactiveFormsModule,
    ArticlesRoutingModule,
    SharedModule
  ],
  declarations: [
    ArticlesComponent,
    ListArticleComponent,
    EditArticleComponent,
    CreateArticleComponent,
    ShowArticleComponent,
  ],
  exports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    PDFExportModule,
    ArticlesComponent,
    ListArticleComponent,
    EditArticleComponent,
    CreateArticleComponent,
    ShowArticleComponent,
  ],
  providers: [
    NgbActiveModal,
    {
      provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter
    }
  ]
})
export class ArticlesModule {
}
