import { ToastrService } from "ngx-toastr";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { OrderModel } from "src/app/core/services/service-order/order.model";
import { OrderService } from "src/app/core/services/service-order/order.service";

@Component({
  selector: "app-admin-all-orders",
  templateUrl: "./admin-all-orders.component.html",
  styleUrls: ["./admin-all-orders.component.scss"]
})
export class AdminAllOrdersComponent implements OnInit {
  displayedColumns: string[] = [
    "shipping.email",
    "orderId",
    "datePlaced",
    "status"
  ];
  dataSource: MatTableDataSource<OrderModel> = new MatTableDataSource<
    OrderModel
  >([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private orderservice: OrderService,
    private toastr: ToastrService
  ) {
    this.orderservice
      .getOrder()
      .subscribe(list => (this.dataSource.data = list));
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.hasNextPage();
    }
  }

  click(row) {
    this.orderservice.changeStatus(row.orderId, row.status);
    this.toastr.success("You have processed order successfully!", "Success!");
    // console.log(row);
  }
}
