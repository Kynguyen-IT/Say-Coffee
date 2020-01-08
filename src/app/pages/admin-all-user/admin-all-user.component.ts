import { AuthUserService } from "src/app/core/services/services-user/auth-user.service";
import { User } from "src/app/core/services/services-user/user";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-admin-all-user",
  templateUrl: "./admin-all-user.component.html",
  styleUrls: ["./admin-all-user.component.scss"]
})
export class AdminAllUserComponent implements OnInit {
  listUser: User[];
  userToEdit: User;
  constructor(
    public serviceUser: AuthUserService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.serviceUser.getAllUser().subscribe(list => {
      this.listUser = list;
    });
  }

  openEdit(event, user) {
    this.userToEdit = user;
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: "700px",
      data: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        birthday: user.birthday,
        phone: user.phone,
        photoURL: user.photoURL,
        roles: user.roles
      }
    });
  }

  deteleUser(event, user) {
    this.serviceUser.deleteUser(user);
    this.toastr.success("You have delete user success!", "Success!");
  }
}
