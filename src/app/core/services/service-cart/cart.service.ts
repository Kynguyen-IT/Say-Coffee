import { Router } from "@angular/router";
import { Product } from "./../service-product/product";
import { AuthUserService } from "./../services-user/auth-user.service";
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
// import { Product } from "../service-product/product";
import { take, map } from "rxjs/operators";
import { ProductService } from "../service-product/product.service";
import { Observable } from "rxjs";
import { CartModel } from "./cart.model";
import { CartItemModel } from "./cart-item.model";

@Injectable({
  providedIn: "root"
})
export class CartService {
  constructor(
    private afs: AngularFirestore,
    private userservice: AuthUserService,
    private product: ProductService,
    private router: Router
  ) {}

  async create() {
    const result = await this.afs.collection("/carts").add({
      createdAt: new Date()
    });
    this.afs.doc(`carts/${result.id}`).set(
      {
        cartId: result.id
      },
      { merge: true }
    );
    return result.id;
  }

  async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;

    const user = this.userservice.getUser();
    if (user) {
      let result = await this.create();
      localStorage.setItem("cartId", result);
      return result;
    }
  }

  async getCart(): Promise<Observable<CartModel>> {
    let cartId = await this.getOrCreateCartId();
    return this.afs
      .doc(`carts/${cartId}`)
      .collection<CartItemModel>("items")
      .valueChanges()
      .pipe(
        map((x: any) => {
          // console.log(x);
          return new CartModel(x);
        })
      );
  }

  private getItem(cartId: string, productId: string) {
    return this.afs.doc(`/carts/${cartId}/items/${productId}`);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.id);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        if (item) {
          let quantity = (item.quantity || 0) + change;
          if (quantity === 0) {
            return item$
              .delete()
              .then(result => console.log(`${product.name} deteled`))
              .catch(err => console.log(err.message));
          }

          item$.set(
            {
              ...product,
              quantity: quantity,
              lastUpdate: new Date()
            },
            { merge: true }
          );
        } else {
          item$.set(
            {
              ...product,
              quantity: 1,
              addeAt: new Date()
            },
            { merge: true }
          );
        }
      });
  }

  async addToCart(product: Product) {
    const user = this.userservice.getUser();
    if (user) {
      this.updateItemQuantity(product, 1);
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }

  async removeFormCart(product: Product) {
    this.updateItemQuantity(product, -1);
    return true;
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    let batch = this.afs.firestore.batch();
    let ref = await this.afs
      .doc(`carts/${cartId}`)
      .collection("items")
      .ref.get();
    ref.forEach(doc => batch.delete(doc.ref));
    return batch.commit();
  }
}
