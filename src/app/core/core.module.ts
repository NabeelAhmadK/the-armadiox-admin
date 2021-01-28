import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ErrorModule } from './error';

import { AuthenticationService } from './authentication/authentication.service';
import { AuthorizationService } from './authorization/authorization.service';
import { AuthenticationGuard } from './authentication/authentication.guard.service';
import { AuthorizationGuard } from './authorization/authorization.guard.service';
import { HttpService } from './http/http.service';
import { HttpCacheService } from './http/http-cache.service';


const SERVICES = [
  AuthenticationService,
  AuthorizationService,
  AuthenticationGuard,
  AuthorizationGuard,
  HttpCacheService
];

import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { CacheInterceptor } from './http/cache.interceptor';

const INTERCEPTORS = [
  ApiPrefixInterceptor,
  CacheInterceptor,
  ErrorHandlerInterceptor,
];

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule, ErrorModule],
  providers: [
    ...SERVICES,
    ...INTERCEPTORS,
    {
      provide: HttpClient,
      useClass: HttpService,
    },
  ],
  declarations: [],
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }

  static forRoot(): ModuleWithProviders<unknown> {
    return {
      ngModule: CoreModule,
      providers: [...SERVICES],
    };
  }
}
