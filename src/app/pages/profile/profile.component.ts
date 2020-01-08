import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorage } from "@angular/fire/storage";
import { User } from "./../../core/services/services-user/user";
import { AuthUserService } from "./../../core/services/services-user/auth-user.service";
import {
  NgbModule,
  NgbModal,
  NgbModalConfig
} from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit, Inject } from "@angular/core";
import { NgModel } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  userLogin;
  imgUrl: string;
  constructor(
    public dialog: MatDialog,
    public servicer: AuthUserService,
    public storge: AngularFireStorage,
    public afauth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.servicer.user$.subscribe(user => {
      this.userLogin = user;
      // console.log(user);
    });
  }

  open(): void {
    const dialogRef = this.dialog.open(ContentDiaLog, {
      width: "500px",
      data: {
        name: this.userLogin.displayName,
        uid: this.userLogin.uid,
        phone: this.userLogin.phone,
        birthday: this.userLogin.birthday
      }
    });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const id = this.firestore.createId();
    const filePath = `${id}-${file.name}`;
    const fileRef = this.storge.ref(filePath);
    const task = this.storge.upload(filePath, file);

    task
      .snapshotChanges()
      .pipe(
        finalize(() =>
          fileRef.getDownloadURL().subscribe(res => {
            this.imgUrl = res;

            this.afauth.auth.currentUser.updateProfile({
              photoURL: res
            });

            return this.firestore.doc(`users/${this.userLogin.uid}`).set(
              {
                photoURL: res
              },
              { merge: true }
            );
          })
        )
      )
      .subscribe();
  }
}

@Component({
  selector: "app-dialog-overview-example-dialog",
  templateUrl: "./contentDiaLog.html"
})
export class ContentDiaLog {
  displayName = this.data.name;
  phone: string = this.data.phone;
  birthday: Date = this.data.birthday;

  constructor(
    public service: AuthUserService,
    private router: Router,
    public dialogRef: MatDialogRef<ContentDiaLog>,
    @Inject(MAT_DIALOG_DATA) public data,
    public storge: AngularFireStorage,
    public afauth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  update() {
    const value = {
      uid: this.data.uid,
      displayName: this.displayName,
      phone: this.phone,
      birthday: this.birthday
    };
    // console.log(value);
    this.service.upadateUserProfile(value);
    window.alert("You have been successfully edit profile!");
  }
}
