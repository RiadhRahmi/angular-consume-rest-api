import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {el} from '@angular/platform-browser/testing/src/browser_util';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const baseUrl = 'http://dev.apilaravel.com/api/';
    let options: {};

    if (currentUser) {
      options = {
        url: `${baseUrl}${req.url}`,
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + currentUser.token,
          'role': '' + currentUser.role === '0' ? 'admin' : 'editor'
        })
      };
    } else {
      options = {
        url: `${baseUrl}${req.url}`
      };
    }
    const modifiedReq = req.clone(options);

    return next.handle(modifiedReq);


  }


}
