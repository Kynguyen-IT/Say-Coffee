import { AuthUserService } from 'src/app/core/services/services-user/auth-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(public service: AuthUserService) {}

  ngOnInit() {}
}
