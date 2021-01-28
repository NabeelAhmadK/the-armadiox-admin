import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss'],
})
export class AccessDeniedComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  Logout() {
    this.authenticationService.logout().subscribe(
      (res) => {
        this.router.navigate(['/login'], { replaceUrl: true });
      },
      (error) => {
        console.dir(error);
        this.router.navigate(['/login'], { replaceUrl: true });
      }
    );
  }
}
