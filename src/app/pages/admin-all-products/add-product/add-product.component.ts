import { ProductService } from "./../../../core/services/service-product/product.service";
import { CategoryService } from "./../../../core/services/service-category/category.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { AuthUserService } from "src/app/core/services/services-user/auth-user.service";
import { Product } from "src/app/core/services/service-product/product";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"]
})
export class AddProductComponent implements OnInit {
  product: Product = {
    name: "",
    price: null,
    category: ""
  };
  category;
  constructor(
    public service: AuthUserService,
    public dialogRef: MatDialogRef<AddProductComponent>,
    // @Inject(MAT_DIALOG_DATA) public data,
    public serviceCate: CategoryService,
    public servivateProduct: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.serviceCate.getAll().subscribe(category => {
      this.category = category;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addProduct() {
    // console.log(this.product);
    if (
      this.product.name.length === 0 ||
      this.product.price === null ||
      this.product.category.length === 0
    ) {
      this.toastr.error(
        "You have not updated name, price or category!",
        "Error"
      );
    } else {
      this.servivateProduct.addProduct(this.product);
      this.toastr.success("You have update success!", "Success!");
      this.onNoClick();
    }
  }
}
