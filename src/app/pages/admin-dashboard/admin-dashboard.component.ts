import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/core/services/service-order/order.service";
import { OrderModel } from "src/app/core/services/service-order/order.model";
import { OrderAdmin } from "src/app/core/services/service-order/admin_order";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"]
})
export class AdminDashboardComponent implements OnInit {
  orders: OrderAdmin[];

  constructor(private orederservice: OrderService) {}

  ngOnInit() {
    this.orederservice.getOrderAdmin().subscribe(list => {
      // console.log(list);
      // let listitems;
      // let total = 0;
      // for (let item of list) {
      //   console.log(item.items);
      //   listitems = item.items;
      //   for (let value of listitems) total += value.totalPrice;
      //   console.log(total);
      // }
      // return total;
      console.log(list);
      this.orders = list;
    });
  }

  // getTotalPrice() {}
}
