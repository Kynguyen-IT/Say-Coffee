import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminDashboardComponent } from "src/app/pages/admin-dashboard/admin-dashboard.component";
import { AdminAllProductsComponent } from "../../pages/admin-all-products/admin-all-products.component";
import { AdminAllUserComponent } from "../../pages/admin-all-user/admin-all-user.component";
import { AddProductComponent } from "../../pages/admin-all-products/add-product/add-product.component";
import { EditProductsComponent } from "src/app/pages/admin-all-products/edit-products/edit-products.component";
import { EditUserComponent } from "src/app/pages/admin-all-user/edit-user/edit-user.component";
import { CartComponent } from "src/app/pages/cart/cart.component";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material-module";
import { AdminAllOrdersComponent } from "../../pages/admin-all-orders/admin-all-orders.component";

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminAllProductsComponent,
    AdminAllUserComponent,
    AddProductComponent,
    EditProductsComponent,
    EditUserComponent,
    AdminAllOrdersComponent
  ],
  entryComponents: [
    AddProductComponent,
    EditProductsComponent,
    EditUserComponent
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule, MaterialModule],
  exports: [AddProductComponent, EditProductsComponent, EditUserComponent]
})
export class AdminModule {}
