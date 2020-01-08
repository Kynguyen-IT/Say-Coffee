import { AuthUserService } from "src/app/core/services/services-user/auth-user.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { EditUserComponent } from "../admin-all-user/edit-user/edit-user.component";
import { CartModel } from "src/app/core/services/service-cart/cart.model";
import { Observable, Subscription } from "rxjs";
import { CartService } from "src/app/core/services/service-cart/cart.service";
import { OrderModel } from "src/app/core/services/service-order/order.model";
import { OrderService } from "src/app/core/services/service-order/order.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-check-out",
  templateUrl: "./check-out.component.html",
  styleUrls: ["./check-out.component.scss"]
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<CartModel>;
  cart: CartModel;
  userId: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    private cartservice: CartService,
    private userservice: AuthUserService,
    private orderservice: OrderService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async ngOnInit() {
    this.cart$ = await this.cartservice.getCart();
    this.cart$.subscribe(list => {
      this.cart = list;
    });
    this.cartSubscription = this.cart$.subscribe(cart => (this.cart = cart));
    this.userSubscription = this.userservice.user$.subscribe(
      user => (this.userId = user.uid)
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  async save(value) {
    const { fullname, email, address, city } = value;
    const shipping = {
      fullname,
      email,
      address,
      city
    };
    let order = new OrderModel(this.userId, shipping, this.cart);
    const result = await this.orderservice.storeOrder({ ...order });
    this.onNoClick();
    this.router.navigate(["/order-success", result.id]);
  }
}
