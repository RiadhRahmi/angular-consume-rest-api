import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) {
  }

  get(url: string) {
    return this.http.get(url).pipe(
      map((data: Response) => data),
      catchError((error: Response) => throwError(error))
    );
  }

  postwithoutPipe(url: string, data: any) {
    return this.http.post(url, data);
  }


  post(url: string, data: any) {
    return this.http.post(url, data).pipe(
      map((res: Response) => res),
      catchError((error: Response) => throwError(error))
    );
  }

  put() {

  }

  delete(url: string) {
    return this.http.delete(url).pipe(
      map((data: Response) => data),
      catchError((error: Response) => throwError(error))
    );
  }


}
