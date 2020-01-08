import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CategoryService } from "src/app/core/services/service-category/category.service";
import { ProductService } from "src/app/core/services/service-product/product.service";
import { AuthUserService } from "src/app/core/services/services-user/auth-user.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { finalize } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-products",
  templateUrl: "./edit-products.component.html",
  styleUrls: ["./edit-products.component.scss"]
})
export class EditProductsComponent implements OnInit {
  id: string = this.data.id;
  name: string = this.data.name;
  price: number = this.data.price;
  category: string = this.data.category;
  image: string = this.data.image;
  categorys;

  imgUrl: string;
  constructor(
    public service: AuthUserService,
    public dialogRef: MatDialogRef<EditProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public serviceCate: CategoryService,
    public servivateProduct: ProductService,
    public firestore: AngularFirestore,
    public storge: AngularFireStorage,
    public afauth: AngularFireAuth,
    private toastr: ToastrService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.serviceCate.getAll().subscribe(cate => {
      this.categorys = cate;
    });
  }

  editProduct() {
    const value = {
      id: this.data.id,
      name: this.name,
      price: this.price,
      category: this.category
    };

    if (this.name === "" || this.price === null || this.category === "") {
      this.toastr.error(
        "You have not updated name, price or category!",
        "Error"
      );
    } else {
      this.servivateProduct.editProduct(value);
      this.toastr.success("You have update success!", "Success!");
    }
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const id = this.firestore.createId();
    const filePath = `${id}-${file.name}`;
    const fileRef = this.storge.ref(filePath);
    const task = this.storge.upload(filePath, file);

    task
      .snapshotChanges()
      .pipe(
        finalize(() =>
          fileRef.getDownloadURL().subscribe(res => {
            this.imgUrl = res;

            return this.firestore.doc(`products/${this.data.id}`).set(
              {
                image: res
              },
              { merge: true }
            );
          })
        )
      )
      .subscribe();
    this.toastr.success("You have upload image success!", "Success!");
  }
}
