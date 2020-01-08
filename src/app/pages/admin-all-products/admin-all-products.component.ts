import { Product } from "./../../core/services/service-product/product";

import { Component, OnInit, Inject } from "@angular/core";
import { ProductService } from "src/app/core/services/service-product/product.service";
import { AuthUserService } from "src/app/core/services/services-user/auth-user.service";
import { Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { AddProductComponent } from "./add-product/add-product.component";
import { EditProductsComponent } from "./edit-products/edit-products.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-admin-all-products",
  templateUrl: "./admin-all-products.component.html",
  styleUrls: ["./admin-all-products.component.scss"]
})
export class AdminAllProductsComponent implements OnInit {
  listProducts: Product[];
  productToEdit: Product;
  constructor(
    private service: ProductService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.service.getAll().subscribe(list => {
      this.listProducts = list;
    });
  }

  openAdd(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: "500px"
    });
  }

  openEdit(event, product) {
    this.productToEdit = product;

    const dialogRef = this.dialog.open(EditProductsComponent, {
      width: "800px",
      data: {
        id: product.id,
        image: product.image,
        name: product.name,
        price: product.price,
        category: product.category
      }
    });
  }

  deleteProcduct(event, product) {
    this.service.deleteProduct(product);
    this.toastr.success("You have delete success!", "Success!");
  }
}
