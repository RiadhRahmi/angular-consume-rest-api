import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticlesService} from '../../shared/services/articles.service';
import {Article} from '../../shared/models/Article';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.css']
})
export class ShowArticleComponent implements OnInit, OnDestroy {
  article: Article;
  id: string;
  subscrition: Subscription;
  showAlert = false;
  alert: any = {};

  constructor(private articlesService: ArticlesService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getArticle();
  }


  getArticle() {
    this.subscrition = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
    this.subscrition = this.articlesService.getArticle(this.id).subscribe(
      data => {
        this.showAlert = false;
        this.article = data['data'];
      },
      error => {
        this.showAlert = true;
        this.alert.type = 'danger';
        this.alert.message = 'failed operation';
      });
  }

  // import * as jspdf from 'jspdf';
// import html2canvas from 'html2canvas';
  // generatePdf() {
  //   const data = document.getElementById('contentToConvert');
  //   html2canvas(data).then(canvas => {
  //     const imgWidth = 208;
  //     const pageHeight = 295;
  //     const imgHeight = canvas.height * imgWidth / canvas.width;
  //     const heightLeft = imgHeight;
  //
  //     const contentDataURL = canvas.toDataURL('image/png');
  //     const pdf = new jspdf('p', 'mm', 'a4');
  //     const position = 0;
  //     pdf.addImage(contentDataURL, 'JPEG', 0, position, imgWidth, imgHeight);
  //     pdf.save('article.pdf');
  //   });
  // }


  ngOnDestroy(): void {
    this.subscrition.unsubscribe();
  }

}
