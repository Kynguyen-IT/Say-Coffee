import { Component, OnInit, Inject } from "@angular/core";
import { AuthUserService } from "src/app/core/services/services-user/auth-user.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CategoryService } from "src/app/core/services/service-category/category.service";
import { Roles } from "src/app/core/services/services-user/user";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"]
})
export class EditUserComponent implements OnInit {
  uid: string = this.data.uid;
  email: string = this.data.email;
  displayName: string = this.data.displayName;
  phone: string = this.data.phone;
  birthday: Date = this.data.birthday;
  photoURL: string = this.data.photoURL;
  roles: object = this.data.roles;

  constructor(
    public service: AuthUserService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}

  editUser() {
    const value = {
      uid: this.data.uid,
      displayName: this.displayName,
      email: this.email,
      phone: this.phone,
      birthday: this.birthday,
      roles: this.roles
    };

    this.service.admineditUser(value);
  }
}
