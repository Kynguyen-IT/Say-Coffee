import { Product } from "src/app/core/services/service-product/product";
// import { Product } from "./../../../core/services/service-product/product";
import { Component, OnInit, Input } from "@angular/core";
import { CartService } from "src/app/core/services/service-cart/cart.service";
import { CartModel } from "src/app/core/services/service-cart/cart.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent implements OnInit {
  @Input("data") listItems;
  @Input("show-actions") showAcitons = true;

  productId: string;
  cart: CartModel;
  cart$: Observable<CartModel>;

  constructor(private cartService: CartService) {}
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.cart$.subscribe(list => (this.cart = list));
  }
}
