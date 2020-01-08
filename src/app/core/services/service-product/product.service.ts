import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Product } from "./product";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  productCollection: AngularFirestoreCollection<Product>;
  procducts: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;
  constructor(private afs: AngularFirestore) {
    this.productCollection = this.afs.collection("products");

    this.procducts = this.productCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Product;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getAll() {
    return this.afs
      .collection("products")
      .snapshotChanges()
      .pipe(
        map((changes: any) =>
          changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
        )
      );
  }

  getHotProduct() {
    return this.afs
      .collection("products", ref => ref.where("hot", "==", true))
      .valueChanges();
  }

  getByCategory(id: string) {
    return this.afs
      .collection("products", ref => ref.where("category", "==", id))
      .valueChanges();
    // return this.productCollection.snapshotChanges().pipe(map)
  }

  getProduct(id) {
    return this.afs.doc(`products/${id}`).valueChanges();
  }

  addProduct(product: Product) {
    this.productCollection.add(product).then(result => {
      this.afs.doc(`products/${result.id}`).set(
        {
          id: result.id
        },
        { merge: true }
      );
    });
  }

  deleteProduct(product: Product) {
    this.productDoc = this.afs.doc(`products/${product.id}`);
    this.productDoc.delete();
  }

  editProduct(product: Product) {
    const productRef = this.afs.doc(`products/${product.id}`);
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category
    };

    return productRef.set(data, { merge: true });
  }
}
