import { CartService } from "src/app/core/services/service-cart/cart.service";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { OrderModel } from "../service-order/order.model";
import { Observable } from "rxjs";
import { OrderAdmin } from "./admin_order";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  ordersRef: AngularFirestoreCollection<OrderModel>;
  constructor(private afs: AngularFirestore, private cartservice: CartService) {
    this.ordersRef = afs.collection<OrderModel>("orders");
  }

  getOrder(): Observable<OrderModel[]> {
    return this.ordersRef.valueChanges();
  }

  getOrderAdmin(): Observable<OrderAdmin[]> {
    return this.afs
      .collection<OrderAdmin>("orders")
      .valueChanges()
      .pipe(
        map((x: any) => {
          const test = x.items.map(order => new OrderAdmin(order));
          return test;
        })
      );
  }

  getItemsOrder(orderId: string) {}

  getOrderSize(): Observable<OrderModel[]> {
    return this.afs
      .collection<OrderModel>("orders", ref => ref.orderBy("item"))
      .valueChanges();
  }

  getOrderId(orderId: string) {
    return this.afs.doc<OrderModel>(`orders/${orderId}`).valueChanges();
  }

  getOrderByUserId(userId: string) {
    return this.afs
      .collection<OrderModel>("orders", ref =>
        ref.where("userId", "==", userId)
      )
      .valueChanges();
  }

  async storeOrder(order) {
    const result = await this.ordersRef.add(order);
    this.ordersRef.doc(`${result.id}`).set(
      {
        orderId: result.id
      },
      { merge: true }
    );
    // this.ordersRef.doc(`${result.id}/items`).set(
    //   {
    //     items: order.cart
    //   },
    //   { merge: true }
    // );
    this.cartservice.clearCart();
    return result;
  }

  changeStatus(orderId, status) {
    return this.afs.doc(`orders/${orderId}`).set(
      {
        status: "approved"
      },
      { merge: true }
    );
  }
}
