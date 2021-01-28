import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationLoaderService implements TranslateLoader {
  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any> {
    var apiAddress = window.location.origin + '/assets/i18n/' + lang + '.json';

    return new Observable((observer) => {
      this.http.get(apiAddress, {}).subscribe(
        (res: any) => {
          observer.next(res);
          observer.complete();
        },
        (error) => {
          //  failed to retrieve from api, switch to local
          this.http.get('/assets/i18n/en.json').subscribe((res: any) => {
            observer.next(res);
            observer.complete();
          });
        }
      );
    });
  }
}
