import { CartModel } from "./../service-cart/cart.model";
export class OrderModel {
  datePlaced = new Date();
  items: any[];
  status: string;
  constructor(public userId: string, public shipping: any, cart: CartModel) {
    this.datePlaced.getTime();
    this.items = cart.items.map(i => {
      return {
        product: {
          name: i.name,
          image: i.image,
          price: i.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      };
    });
    this.status = "pending";
  }
}
