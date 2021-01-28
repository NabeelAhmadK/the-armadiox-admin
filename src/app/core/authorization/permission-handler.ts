import { AuthorizationService } from './authorization.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PermissionHandler {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authorizationService: AuthorizationService
  ) {}

  async handlePermission(route) {
    let perms = await this.authorizationService.allPermissions(
      route.data.funcId
    );
    if (!perms) {
      console.log('Not permissions, redirecting and adding redirect url...');
      this.router.navigate(['/access-denied'], { replaceUrl: true });
      return false;
    } else {
      if (route.data.perm) {
        let _perm = perms[route.data.perm];
        let routeData = Object.assign({}, route.data);
        routeData['functionperms'] = perms;

        route.data = routeData;

        if (!_perm)
          this.router.navigate(['/access-denied'], { replaceUrl: true });

        return _perm;
      } else {
        return true;
      }
    }
  }

  routePermissionsByFunctionId(funcId) {
    return funcId ? this.authorizationService.allPermissions(funcId) : null;
  }
}
