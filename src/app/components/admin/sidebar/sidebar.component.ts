import { AuthUserService } from "./../../../core/services/services-user/auth-user.service";
import { User } from "./../../../core/services/services-user/user";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  userLogin: User;
  isMenuOpen = true;
  contentMargin = 300;
  constructor(public service: AuthUserService) {}

  ngOnInit() {
    this.service.user$.subscribe(user => {
      this.userLogin = user;
    });
  }
}
