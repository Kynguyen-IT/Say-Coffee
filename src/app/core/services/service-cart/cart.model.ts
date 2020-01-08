import { Product } from "src/app/core/services/service-product/product";
import { CartItemModel } from "./cart-item.model";

export class CartModel {
  items: CartItemModel[] = [];

  constructor(private productMap: CartItemModel[]) {
    for (let product of productMap) {
      this.items.push(new CartItemModel(product));
    }
  }

  getQuantity(product: Product) {
    for (let p of this.productMap) {
      let item = p;
      if (item.id == product.id) {
        return item ? item.quantity : 0;
      }
    }
    return 0;
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) sum += this.items[productId].totalPrice;
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.items) count += this.items[productId].quantity;
    return count;
  }
}
