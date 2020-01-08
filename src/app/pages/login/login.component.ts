import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/core/services/services-user/auth-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public sevicer: AuthUserService, private router: Router) {}

  ngOnInit() {
    this.sevicer.user$.subscribe(user => {
      if (user) {
        this.router.navigate(['/']);
      }
    });
  }

  googleSignUser() {
    this.sevicer.googleSignin();
  }
}
