import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {}

  createDoc(data:any,path:string,id:string){
    const collection = this.firestore.collection(path)
    return collection.doc(id).set(data)
  }

  getDoc<tipo>(path:string,id:string){
    const collection = this.firestore.collection(path);
    return collection.doc<tipo>(id).valueChanges()

  }

  getDocCorreo<tipo>(path:string,correo:string){
    var db = this.firestore
    const collection = this.firestore.collection(path);
    //console.log(collection.valueChanges())
    return collection.doc<tipo>(correo).valueChanges()
  }

  deleteDoc(path:string,id:string){
    const collection = this.firestore.collection(path)
    return collection.doc(id).delete()
  }

  updateDoc(data:any,path:string,id:string){
    const collection = this.firestore.collection(path)
    return collection.doc(id).update(data)

  }
}
