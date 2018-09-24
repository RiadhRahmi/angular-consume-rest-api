import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private baseService: BaseService) {
  }


  exportArticles(article: any): Observable<any> {
    return this.baseService.post('articles', article);
  }

  searchArticles(nbrPage, article: any): Observable<any> {
    return this.baseService.post('articles?page=' + nbrPage, article);
  }

  getArticles(nbrPage): Observable<any> {
    return this.baseService.get('articles?page=' + nbrPage);
  }

  getArticle(id) {
    return this.baseService.get('articles/' + id);
  }

  createArticle(article: any) {
    return this.baseService.post('articles/add', article);
  }

  updateArticle(article: any, idArticle) {
    return this.baseService.post('articles/' + idArticle + '/update', article);
  }

  delete(id) {
    return this.baseService.delete('articles/' + id);
  }


}
