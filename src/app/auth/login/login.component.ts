import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../core'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public show: boolean = false;
  public loginForm: FormGroup;
  public errorMessage: any;
  public showLoader: boolean = false;
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    private formBuilder: FormBuilder) {
    authenticationService.setCredentials();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, [Validators.required]]
    })
  }

  showPassword() {
    this.show = !this.show;
  }

  Login() {
    if (this.loginForm.invalid)
      return;
    this.showLoader = true;

    this.authenticationService.login(this.loginForm.value)
      .subscribe(res => {
        this.showLoader = false;
        this.authenticationService.setCredentials(
          res,
          this.loginForm.value.remember
        );
        this.toast.success(
          `Welcome to Armadiox Admin Panel`,
          `You have Successfully Logged In`
        );
        this.route.queryParams.subscribe((params) =>
          this.router.navigate(['/pages/dashboard'], {
            replaceUrl: true,
          })
        );
      }, err => {
        this.showLoader = false;
      })
  }

}
