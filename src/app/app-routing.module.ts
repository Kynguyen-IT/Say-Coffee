import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ListProductsComponent } from "./pages/list-products/list-products.component";
import { AdminComponent } from "./layouts/admin/admin.component";
import { AdminGuard } from "./core/admin.guard";
import { MemberComponent } from "./layouts/member/member.component";
import { OrderSuccessComponent } from "./pages/order-success/order-success.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {
        path: "",
        loadChildren: "./layouts/admin/admin.module#AdminModule"
      }
    ]
  },
  {
    path: "home",
    component: MemberComponent,
    children: [
      {
        path: "",
        loadChildren: "./layouts/member/member.module#MemberModule"
      }
    ]
  },
  { path: "order-success/:id", component: OrderSuccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
