import { CartService } from "src/app/core/services/service-cart/cart.service";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { switchMap, map } from "rxjs/operators";
import { auth } from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { User } from "./user";

@Injectable({
  providedIn: "root"
})
export class AuthUserService {
  user$: Observable<User>;
  userDoc: AngularFirestoreDocument<User>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getUser(): firebase.User {
    const user = this.afAuth.auth.currentUser;
    if (user) return user;
    return null;
  }

  getAllUser() {
    return this.afs
      .collection("users")
      .snapshotChanges()
      .pipe(
        map((changes: any) =>
          changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
        )
      );
  }

  async googleSignin() {
    const procider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(procider);
  }

  private oAuthLogin(procider) {
    return this.afAuth.auth.signInWithPopup(procider).then(credential => {
      this.updateUserData(credential.user);
    });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(["/"]);
  }

  admineditUser(user) {
    const userRef = this.afs.doc(`users/${user.uid}`);
    const data = {
      displayName: user.displayName,
      email: user.email,
      phone: user.phone,
      birthday: user.birthday,
      roles: user.roles
    };

    this.afAuth.auth.currentUser.updateProfile({
      displayName: data.displayName
    });

    return userRef.set(data, { merge: true });
  }

  deleteUser(user) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.delete();
  }

  upadateUserProfile(user) {
    const userRef = this.afs.doc(`users/${user.uid}`);
    const data = {
      displayName: user.displayName,
      phone: user.phone,
      birthday: user.birthday
    };

    this.afAuth.auth.currentUser.updateProfile({
      displayName: data.displayName
    });

    return userRef.set(data, { merge: true });
  }

  signUp(email, password, displayName) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user
          .updateProfile({
            displayName: displayName,
            photoURL: "../../../../assets/images/images.png"
          })
          .then(() => {
            window.alert("You have been successfully registered!");
            return this.updateUserData(result.user);
          });
      })
      .catch(error => {
        window.alert(error.messges);
      });
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data = {
      uid: user.uid,
      email: user.email,
      roles: {
        subscriber: false
      },
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });
  }

  signIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        this.router.navigate(["/"]);
      })
      .catch(error => {
        window.alert(error);
      });
  }

  canRead(user: User): boolean {
    const allowed = ["admin", "editor", "subscriber"];
    return this.checkAuthorzition(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ["admin", "editor"];
    return this.checkAuthorzition(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ["admin"];
    return this.checkAuthorzition(user, allowed);
  }

  private checkAuthorzition(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;

    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }
}
