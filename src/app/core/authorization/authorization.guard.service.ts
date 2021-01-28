import { Injectable } from '@angular/core';
import {
  Router,
  CanLoad,
  UrlSegment,
  Route,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { PermissionHandler } from './permission-handler';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard
  implements CanLoad, CanActivateChild, Resolve<any> {
  constructor(
    private router: Router,
    private permissionHandler: PermissionHandler
  ) {}

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.permissionHandler.handlePermission(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.permissionHandler.handlePermission(childRoute);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.permissionHandler.routePermissionsByFunctionId(
      route.data.funcId
    );
  }
}
