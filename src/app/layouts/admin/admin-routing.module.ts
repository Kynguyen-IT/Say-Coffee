import { AdminAllOrdersComponent } from "./../../pages/admin-all-orders/admin-all-orders.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminDashboardComponent } from "src/app/pages/admin-dashboard/admin-dashboard.component";
import { AdminAllProductsComponent } from "src/app/pages/admin-all-products/admin-all-products.component";
import { AdminAllUserComponent } from "src/app/pages/admin-all-user/admin-all-user.component";

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "dashboard", component: AdminDashboardComponent },
  { path: "allProducts", component: AdminAllProductsComponent },
  { path: "allUsers", component: AdminAllUserComponent },
  { path: "allOrders", component: AdminAllOrdersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
