import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireStorage } from "@angular/fire/storage";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  categorys$;
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.categorys$ = this.afs.collection("category").valueChanges();
  }

  getAll() {
    return this.afs
      .collection("category")
      .snapshotChanges()
      .pipe(
        map((changes: any) =>
          changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
        )
      );
  }
}
