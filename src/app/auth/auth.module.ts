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
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const PAGES = [
  LoginComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent
]

@NgModule({
  declarations: [...PAGES],
  imports: [...MODULES],
  providers: [AuthenticationService]
})
export class AuthModule { }
