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

  getCollection(){
    console.log('Estoy por leer una coleccion');
    this.firestore.collection('Estudiantes').get().subscribe((res) => {

    });
  }
}
