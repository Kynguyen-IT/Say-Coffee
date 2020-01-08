import { SidebarComponent } from "./../sidebar/sidebar.component";
import { Component, OnInit } from "@angular/core";
import { AuthUserService } from "src/app/core/services/services-user/auth-user.service";
import { User } from "src/app/core/services/services-user/user";

@Component({
  selector: "app-navbar-admin",
  templateUrl: "./navbar-admin.component.html",
  styleUrls: ["./navbar-admin.component.scss"]
})
export class NavbarAdminComponent implements OnInit {
  userLogin: User;
  open = true;
  constructor(
    public service: AuthUserService // private sbcomponent: SidebarComponent
  ) {}
  onToolbarMenuToggle() {
    // this.sbcomponent.isMenuOpen = !this.sbcomponent.isMenuOpen;
    // if (!this.sbcomponent.isMenuOpen) {
    //   this.sbcomponent.contentMargin = 80;
    // } else {
    //   this.sbcomponent.contentMargin = 300;
    // }
    this.open = !this.open;

    console.log("dsadsg");
  }

  ngOnInit() {
    this.service.user$.subscribe(user => {
      this.userLogin = user;
      // console.log(user);
    });
  }
}
