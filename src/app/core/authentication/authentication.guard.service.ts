import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authenticationService.isAuthenticated()) return true;
    else {
      console.log('Not authenticated, redirecting and adding redirect url...');
      this.router.navigate(['/login'], {
        queryParams: { redirect: state.url },
        replaceUrl: true,
      });
      return false;
    }
  }
}
