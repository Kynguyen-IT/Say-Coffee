import { CartComponent } from "src/app/pages/cart/cart.component";
import { ProfileComponent } from "./../../pages/profile/profile.component";
import { RegisterComponent } from "./../../pages/register/register.component";
import { LoginComponent } from "./../../pages/login/login.component";
import { ListProductsComponent } from "./../../pages/list-products/list-products.component";
import { ProfileProductComponent } from "../../pages/profile-product/profile-product.component";

import { HomeComponent } from "./../../pages/home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MenuComponent } from "src/app/pages/menu/menu.component";
import { OrderSuccessComponent } from "src/app/pages/order-success/order-success.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: "menu",
    component: MenuComponent,
    children: [
      { path: "", component: ListProductsComponent },
      { path: ":id", component: ListProductsComponent }
    ]
  },

  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent },
  { path: "profile-product/:id", component: ProfileProductComponent },
  { path: "cart", component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
