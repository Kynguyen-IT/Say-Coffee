import { itemOrder } from "./itemOrder";
export class OrderAdmin {
  items: any[];

  constructor(private productMap: itemOrder[]) {
    for (let product of productMap) {
      this.items.push(new itemOrder(product));
      console.log(this.items);
    }

    console.log(this.items);
  }

  // get total() {
  //   // let sum = 0;
  //   // // tslint:disable-next-line: forin
  //   // for (let item in this.items) {
  //   //   console.log(this.items[item].totalPrice);
  //   //   sum += this.items[item].totalPrice;
  //   // }
  //   // return sum;
  //   for (let item in this.items) {
  //     console.log(item);
  //   }
  // }
}
