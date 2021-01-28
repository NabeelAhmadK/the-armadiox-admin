import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutes } from './auth.routing';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationService } from '../core';
const MODULES = [
  CommonModule,
  AuthRoutes,
  SharedModule
]

import { LoginComponent } from './login/login.component'


const PAGES = [
  LoginComponent
]

@NgModule({
  declarations: [...PAGES],
  imports: [...MODULES],
  providers: [AuthenticationService]
})
export class AuthModule { }
