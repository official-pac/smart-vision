import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private BASE_URL = environment.baseUrl;
  constructor(private http: HttpClient) { }

  get(url: string, filterKey?: string): Observable<any> {
    try {
      if (!filterKey) {
        return this.http.get(this.BASE_URL + url);
      } else {
        return this.http.get(this.BASE_URL + url)
          .pipe(map((val: any) => val[filterKey]));
      }
    } catch (error) { throw error; }
  }

}
