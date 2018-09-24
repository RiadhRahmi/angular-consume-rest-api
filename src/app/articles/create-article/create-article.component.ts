import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ArticlesService} from '../../shared/services/articles.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
})
export class CreateArticleComponent implements OnInit, OnDestroy {
  pagetitle = 'Ajouter Article';
  angForm: FormGroup;
  showAlert = false;
  alert: any = {};
  selectedFile: File;
  subcribtion = new Subscription();

  constructor(private articlesService: ArticlesService, private router: Router, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.createForm();
  }


  createForm() {
    this.angForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
      author: ['', Validators.required],
      image: [null, Validators.required],
      published_at: ['', Validators.required],
    });
  }

  get title() {
    return this.angForm.get('title');
  }

  get body() {
    return this.angForm.get('body');
  }

  get author() {
    return this.angForm.get('author');
  }

  get image() {
    return this.angForm.get('image');
  }

  get published_at() {
    return this.angForm.get('published_at');
  }

  createArticle() {
    const user = new FormData();
    const date = this.angForm.value.published_at.day + '/' +
      this.angForm.value.published_at.month + '/' +
      this.angForm.value.published_at.year;
    user.append('image', this.selectedFile);
    user.append('title', this.angForm.value.title);
    user.append('author', this.angForm.value.author);
    user.append('body', this.angForm.value.body);
    user.append('published_at', date);
    this.subcribtion = this.articlesService.createArticle(user).subscribe(
      data => {
        if (data['status'] === 201) {
          return this.router.navigate(['articles']);
        } else {
          this.showAlert = true;
          this.alert.type = 'danger';
          this.alert.message = data['data'];
        }
      },
      error => {
        this.showAlert = true;
        this.alert.type = 'danger';
        this.alert.message = 'failed operation';
      });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  ngOnDestroy(): void {
    this.subcribtion.unsubscribe();
  }


}
