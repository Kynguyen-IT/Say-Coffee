import { CategoryService } from "./../../core/services/service-category/category.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ProductService } from "src/app/core/services/service-product/product.service";
import { Product } from "src/app/core/services/service-product/product";
import { CartModel } from "src/app/core/services/service-cart/cart.model";
import { Observable } from "rxjs";
import { CartService } from "src/app/core/services/service-cart/cart.service";
import { ToastrService } from "ngx-toastr";
import { NgwWowService } from "ngx-wow";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  listProduct: Product[];
  cart: CartModel;
  cart$: Observable<CartModel>;
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    autoplaySpeed: 3000
  };

  images = [
    {
      src:
        "./assets/images/espresso-machine-making-coffee-in-bar-picjumbo-com.jpg"
    },

    { src: "./assets/images/pikwizard-9c64c62ebbe9a39e3de6c98b08764297.jpg" },
    { src: "./assets/images/coffee-984328_1920.jpg" }
  ];

  constructor(
    public service: CategoryService,
    private productservice: ProductService,
    private cartService: CartService,
    private toastr: ToastrService,
    private wowservice: NgwWowService
  ) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.toastr.success("You have add to cart success!", "Success!");
  }

  async ngOnInit() {
    this.productservice.getHotProduct().subscribe(list => {
      this.listProduct = list;
    });

    this.cart$ = await this.cartService.getCart();
    this.cart$.subscribe(list => (this.cart = list));
    this.wowservice.init();
  }

  // reset() {
  //   this.wowservice.init();
  // }
}
