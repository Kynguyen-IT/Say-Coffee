import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/core/services/service-product/product";
import { CategoryService } from "src/app/core/services/service-category/category.service";
import { ProductService } from "src/app/core/services/service-product/product.service";
import { Subject, Observable } from "rxjs";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  listProduct: Product[];
  searchdata: string;
  startAt = new Subject();
  endAt = new Subject();

  constructor(
    public service: CategoryService,
    private productservice: ProductService
  ) {}

  ngOnInit() {}

  search($event) {}
}
