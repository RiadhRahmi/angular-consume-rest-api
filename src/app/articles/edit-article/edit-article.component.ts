import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ArticlesService} from '../../shared/services/articles.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit, OnDestroy {
  pagetitle = 'Edit Article';
  angForm: FormGroup;
  showAlert = false;
  alert: any = {};
  subscrition: Subscription;
  idLastArticle;
  article = {
    title: '',
    author: '',
    body: '',
    published_at: null
  };


  constructor(private articlesService: ArticlesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.createForm();
    this.getArticle();
  }

  createForm() {
    this.angForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'author': new FormControl('', [Validators.required]),
      'body': new FormControl('', Validators.required),
      'published_at': new FormControl('', Validators.required)
    });
  }

  getArticle() {
    this.subscrition = this.activatedRoute.params.subscribe(params => {
      this.idLastArticle = params.id;
    });

    this.subscrition = this.articlesService.getArticle(this.idLastArticle).subscribe(
      data => {
        this.article.title = data['data'].title;
        this.article.author = data['data'].author;
        this.article.body = data['data'].body;
        const date = data['data'].published_at.split('/');
        this.article.published_at = {
          year: parseInt(date[2], 10),
          month: parseInt(date[1], 10),
          day: parseInt(date[0], 10)
        };
        this.angForm.setValue(this.article);

      },
      error => {
        this.showAlert = true;
        this.alert.type = 'danger';
        this.alert.message = 'failed operation';
      });
  }


  onSubmit() {
    const date = this.angForm.value.published_at.day + '/' +
      this.angForm.value.published_at.month + '/' +
      this.angForm.value.published_at.year;
    this.article.title = this.angForm.value.title;
    this.article.author = this.angForm.value.author;
    this.article.body = this.angForm.value.body;
    this.article.published_at = date;

    this.subscrition = this.articlesService.updateArticle(this.article, this.idLastArticle).subscribe(
      data => {
        this.router.navigate(['articles']);
      },
      error => {
        this.showAlert = true;
        this.alert.type = 'danger';
        this.alert.message = 'failed operation';
      });

  }

  ngOnDestroy(): void {
    this.subscrition.unsubscribe();
  }


}
