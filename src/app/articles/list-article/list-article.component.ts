import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticlesService} from '../../shared/services/articles.service';
import {Article} from '../../shared/models/Article';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExcelService} from '../../shared/services/excel.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-listarticle',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css'],
})
export class ListArticleComponent implements OnInit, OnDestroy {
  pagetitle = 'Liste des articles';
  articles: Article[];
  subcribtion = new Subscription();
  showAlert = false;
  alert: any = {};
  selectedArticle;
  searchArticle = {
    published_at: '',
    title: '',
    author: '',
    export: true
  };
  isCollapsed = false;

  constructor(public authService: AuthService,
              private articlesService: ArticlesService, private router: Router,
              private activeModal: NgbActiveModal, private modalService: NgbModal,
              private excelService: ExcelService) {
  }

  ngOnInit() {
    this.getArticles(1);
  }

  recherche(searchData, published_at) {
    const article = {
      title: searchData.title,
      author: searchData.author,
      published_at: published_at
    };

    this.subcribtion = this.articlesService.searchArticles(1, article).subscribe(
      data => {
        this.articles = data['data'];
      },
      error => {
        this.showAlert = true;
        this.alert.type = 'danger';
        this.alert.message = 'failed operation';
      });
  }

  export() {
    // console.log(this.searchArticle);
    this.subcribtion = this.articlesService.exportArticles(this.searchArticle).subscribe(
      data => {
        this.excelService.exportAsExcelFile(data['data'], 'articles');
      },
      error => {
        this.showAlert = true;
        this.alert.type = 'danger';
        this.alert.message = 'failed operation';
      });
  }

  getArticles(nbrPage) {
    this.subcribtion = this.articlesService
      .getArticles(nbrPage)
      .subscribe(
        data => {
          this.articles = data['data'];
        },
        error => {
          this.showAlert = true;
          this.alert.type = 'danger';
          this.alert.message = 'failed operation';
        });
  }

  addArticle() {
    this.router.navigate(['/articles/ajouter']);
  }

  showArticle(id) {
    this.router.navigate(['/articles/' + id + '/show']);
  }

  delete(id) {
    this.activeModal.close();
    this.subcribtion = this.articlesService.delete(id).subscribe(
      data => {
        if (data['status'] === 200) {
          this.getArticles(1);
          this.showAlert = true;
          this.alert.type = 'success';
          this.alert.message = 'successful operation';
        }
      },
      error => {
        this.showAlert = true;
        this.alert.type = 'danger';
        this.alert.message = 'failed operation' + error;
      });
  }


  open(content, article) {
    this.selectedArticle = article;
    this.activeModal = this.modalService.open(content);
  }


  ngOnDestroy(): void {
    this.subcribtion.unsubscribe();
  }

}

