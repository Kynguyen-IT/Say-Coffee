export class itemOrder {
  product: any[];
  quantity: number;
  totalPrice: number;

  constructor(init?: Partial<itemOrder>) {
    Object.assign(this, init);
  }
}
