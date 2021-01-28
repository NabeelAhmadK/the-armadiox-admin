import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface LoginContext {
  username: string;
  password: string;
  grant_type: string;
  client_id: string;
}

const credentialsKey = 'credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _credentials: any;
  private _remember: boolean = false;

  constructor(private http: HttpClient) {
    const savedCredentials =
      sessionStorage.getItem(credentialsKey) ||
      localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  login(context: LoginContext): Observable<any> {
    return this.http.post('auth/login', context);
  }

  logout(): Observable<any> {
    // Customize credentials invalidation here
    const savedCredentials =
      sessionStorage.getItem(credentialsKey) ||
      localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      let context = {
        token_type_hint: 'refresh_token',
        token: JSON.parse(savedCredentials).accessToken,
      };
      return this.http.post('logout', context);
    }
    return of(true);
  }

  refreshToken(): Observable<any> {
    const storage = this._remember ? localStorage : sessionStorage;
    let context = {
      grant_type: 'refresh_token',
      refresh_token: JSON.parse(storage.getItem('credentials')).refreshToken,
    };
    return this.http.post('token/refresh', context);
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  get credentials(): any | null {
    return this._credentials;
  }

  setCredentials(credentials?: any, remember?: boolean) {
    this._credentials = credentials || null;
    this._remember = remember;
    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(
        credentialsKey,
        JSON.stringify({
          accessToken: credentials.tokens.access.token,
          expiresIn: credentials.tokens.access.expires,
          refreshToken: credentials.tokens.refresh.token,
          tokenType: credentials.token_type || 'bearer',
          user: credentials.user
        })
      );
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
      localStorage.removeItem('currentLang');
    }
  }
}
