import { ProductService } from "./../../core/services/service-product/product.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product } from "src/app/core/services/service-product/product";

@Component({
  selector: "app-list-products",
  templateUrl: "./list-products.component.html",
  styleUrls: ["./list-products.component.scss"]
})
export class ListProductsComponent implements OnInit {
  listProducts: Product[];
  idCategory;
  constructor(
    private service: ProductService,
    private router: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.service.getAll().subscribe(list => {
      this.listProducts = list;
    });

    this.router.paramMap.subscribe(params => {
      this.idCategory = params.get("id");
      if (this.idCategory) {
        this.service.getByCategory(this.idCategory).subscribe(list => {
          this.listProducts = list;
        });
      }
    });
  }
}
