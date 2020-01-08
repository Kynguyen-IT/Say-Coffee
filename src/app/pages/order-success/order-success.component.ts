import { OrderService } from "src/app/core/services/service-order/order.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { OrderModel } from "src/app/core/services/service-order/order.model";

@Component({
  selector: "app-order-success",
  templateUrl: "./order-success.component.html",
  styleUrls: ["./order-success.component.scss"]
})
export class OrderSuccessComponent implements OnInit {
  orderId: string;
  order: OrderModel;
  orderSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private orderservice: OrderService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((list: any) => {
      if (list.params["id"]) {
        this.orderId = list.params["id"];
        this.orderSub = this.orderservice
          .getOrderId(list.params["id"])
          .subscribe(list => (this.order = list));
      }
    });
  }

  ngOnDestroy(): void {
    this.orderSub.unsubscribe();
  }
}
