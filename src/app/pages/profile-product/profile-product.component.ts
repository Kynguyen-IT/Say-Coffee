import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "src/app/core/services/service-product/product.service";

@Component({
  selector: "app-profile-product",
  templateUrl: "./profile-product.component.html",
  styleUrls: ["./profile-product.component.scss"]
})
export class ProfileProductComponent implements OnInit {
  product;
  idproduct;
  constructor(
    private service: ProductService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.idproduct = params.get("id");
      if (this.idproduct) {
        this.service.getProduct(this.idproduct).subscribe(item => {
          this.product = item;
          console.log(item);
        });
      }
    });
  }
}
