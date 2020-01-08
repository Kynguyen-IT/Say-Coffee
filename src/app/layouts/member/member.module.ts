import { CartComponent } from "src/app/pages/cart/cart.component";
import { MenuComponent } from "./../../pages/menu/menu.component";
import { ListProductsComponent } from "./../../pages/list-products/list-products.component";
import { HomeComponent } from "./../../pages/home/home.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MemberRoutingModule } from "./member-routing.module";
import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";
import { ProfileComponent } from "../../pages/profile/profile.component";
import { NgbModule, NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { ItemComponent } from "src/app/pages/list-products/item/item.component";
import { ProfileProductComponent } from "../../pages/profile-product/profile-product.component";
import { SlickCarouselModule } from "ngx-slick-carousel";

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ListProductsComponent,
    ItemComponent,
    ProfileProductComponent,
    MenuComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    NgbModule,
    FormsModule,
    NgbDropdownModule,
    SlickCarouselModule
  ]
})
export class MemberModule {}
