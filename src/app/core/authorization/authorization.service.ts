import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { Permission } from '../utils/permission';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private userEndpoint: string = 'user';
  rolePermissions: any = new Map([]);

  private _currentComponentPermissions = new BehaviorSubject<any>(null);
  currentComponentPermissions = this._currentComponentPermissions.asObservable();

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.setcurrentComponentPermissions(null);
    this.rolePermissions.clear();
    if (
      this.authenticationService.credentials &&
      this.authenticationService.credentials.user
    )
      this.getPermissions();
  }

  async getPermissions(): Promise<any> {
    let perm = await this.http
      .get(
        `${this.userEndpoint}/${this.authenticationService.credentials.user.user_id}/role`
      )
      .toPromise();
    return await this.updatePermission(perm['rolePermissions']);
  }

  setcurrentComponentPermissions(perms) {
    this._currentComponentPermissions.next(perms);
  }

  /**
   * Update permissions object
   */
  updatePermission(permissions) {
    this.rolePermissions.clear();
    permissions.forEach((perm) => {
      this.rolePermissions.set(perm.function_id, {
        role_id: perm.role_id,
        function_id: perm.function_id,
        function_name: perm.function_name,
        locale_key: perm.locale_key,
        function_url: perm.function_url,
        icon: perm.icon,
        function_class: perm.function_class,
        parent_function_id: perm.parent_function_id,
        can_view: perm.can_view,
        can_create: perm.can_create,
        can_update: perm.can_update,
        can_delete: perm.can_delete,
        menu_order: perm.menu_order || 0,
        children: [],
      });
    });

    this.setcurrentComponentPermissions(this.rolePermissions);
  }

  /**
   *
   * @param funcId Function ID
   * @return permissions assign to this function
   */
  async allPermissions(funcId, url?) {
    if (!this.rolePermissions.size) {
      await this.getPermissions();
      return funcId && this.rolePermissions.size
        ? this.rolePermissions.get(funcId) || new Permission()
        : new Permission();
    } else {
      return funcId && this.rolePermissions.size
        ? this.rolePermissions.get(funcId) || new Permission()
        : new Permission();
    }
  }

  /**
   *
   * @param funcId Function ID
   * @param permName is canView, canAdd, canEdit, canDelete
   * @return specific permission that is allowed or not to the function
   */
  hasPermission(funcId, permName): boolean {
    return funcId && this.rolePermissions.size
      ? this.rolePermissions.get(funcId)[permName]
      : false;
  }
}
