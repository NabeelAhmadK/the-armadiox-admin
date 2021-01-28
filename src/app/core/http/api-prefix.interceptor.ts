import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var header: HttpHeaders = new HttpHeaders({
      Authorization: this.getAuthorization(request.url || null),
      Accept: 'application/json',
    });
    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({
        headers: header,
        url: environment.serverUrl + request.url,
      });
    }
    return next.handle(request);
  }

  getAuthorization(endpoint: any) {
    let storage =
      sessionStorage.getItem('credentials') ||
      localStorage.getItem('credentials');
    if (
      storage &&
      endpoint &&
      endpoint.toString().toLowerCase() != 'token/refresh' &&
      endpoint.toString().toLowerCase() != 'logout'
    )
      return 'Bearer ' + JSON.parse(storage).accessToken;
    else return 'Basic MTAxOjEwMQ==';
  }
}
