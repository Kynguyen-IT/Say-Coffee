import { NgwWowService } from "ngx-wow";
import { MatDialogRef } from "@angular/material/dialog";
import { CartService } from "./../../../core/services/service-cart/cart.service";
import { User } from "../../../core/services/services-user/user";
import { Component, OnInit } from "@angular/core";
import { AuthUserService } from "src/app/core/services/services-user/auth-user.service";
import { MatDialog } from "@angular/material";
import { CartComponent } from "src/app/pages/cart/cart.component";
import { CartModel } from "src/app/core/services/service-cart/cart.model";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  isCollapsed = false;
  userLogin: User;
  cart: CartModel;
  cart$: Observable<CartModel>;
  constructor(
    public service: AuthUserService,
    private cartservice: CartService,
    private wowservice: NgwWowService
  ) {}

  async ngOnInit() {
    this.service.user$.subscribe(user => {
      this.userLogin = user;
    });
    this.wowservice.init();

    this.cart$ = await this.cartservice.getCart();
    this.cart$.subscribe(list => (this.cart = list));
  }

  signOut() {
    this.cartservice.clearCart();
    this.service.signOut();
  }

  reset() {
    this.wowservice.init();
  }
}
