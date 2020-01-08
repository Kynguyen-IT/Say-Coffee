import { MatDialogModule } from "@angular/material/dialog";
import { AdminModule } from "./layouts/admin/admin.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { NgbModule, NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NavbarComponent } from "./components/member/navbar/navbar.component";

import { AuthUserService } from "./core/services/services-user/auth-user.service";
import { CategoryService } from "./core/services/service-category/category.service";
import { ProductService } from "./core/services/service-product/product.service";
import { CartService } from "./core/services/service-cart/cart.service";
import { ContentDiaLog } from "./pages/profile/profile.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { FooterComponent } from "./components/member/footer/footer.component";
import { environment } from "src/environments/environment";
import { AdminComponent } from "./layouts/admin/admin.component";
import { MemberComponent } from "./layouts/member/member.component";
import { NavbarAdminComponent } from "./components/admin/navbar-admin/navbar-admin.component";
import { SidebarComponent } from "./components/admin/sidebar/sidebar.component";
import { MaterialModule } from "./material-module";
import { CheckOutComponent } from "./pages/check-out/check-out.component";
import { NgwWowModule } from "ngx-wow";
import { OrderService } from "./core/services/service-order/order.service";
import { OrderSuccessComponent } from "./pages/order-success/order-success.component";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AdminComponent,
    MemberComponent,
    NavbarAdminComponent,
    SidebarComponent,
    ContentDiaLog,
    CheckOutComponent,
    OrderSuccessComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbDropdownModule,
    AdminModule,
    MatDialogModule,
    NgwWowModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-top-right"
    })
  ],
  entryComponents: [ContentDiaLog, CheckOutComponent],
  providers: [
    AuthUserService,
    CategoryService,
    CartService,
    ProductService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
