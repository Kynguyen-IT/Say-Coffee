import { CartService } from "src/app/core/services/service-cart/cart.service";
import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material/dialog";
import { CartModel } from "src/app/core/services/service-cart/cart.model";
import { Observable } from "rxjs";
import { Product } from "src/app/core/services/service-product/product";
import { CheckOutComponent } from "../check-out/check-out.component";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  cart: CartModel;
  cart$: Observable<CartModel>;
  constructor(
    private cartservice: CartService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  addToCart(product: Product) {
    this.cartservice.addToCart(product);
  }

  openCheckout(): void {
    const dialogRef = this.dialog.open(CheckOutComponent, {
      width: "900px"
    });
  }

  removeFormCart(product: Product) {
    this.cartservice.removeFormCart(product);
  }

  clearCart() {
    this.cartservice.clearCart();
    this.toastr.success("You have delete Cart success!", "Success!");
  }

  async ngOnInit() {
    this.cart$ = await this.cartservice.getCart();
    this.cart$.subscribe(list => {
      this.cart = list;
    });
  }
}
