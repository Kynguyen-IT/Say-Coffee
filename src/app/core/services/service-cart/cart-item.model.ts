export class CartItemModel {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;

  constructor(init?: Partial<CartItemModel>) {
    Object.assign(this, init);
  }

  get totalPrice() {
    return this.price * this.quantity;
  }
}
