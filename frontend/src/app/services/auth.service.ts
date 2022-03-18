import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserI } from '../models/model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authfirebase:AngularFireAuth) { }

  login(correo:string,password:string){

    return this.authfirebase.signInWithEmailAndPassword(correo,password)
  }

  logout(){
    this.authfirebase.signOut();
  }

  registrarUser(datos:UserI){
    return this.authfirebase.createUserWithEmailAndPassword(datos.correo,datos.password)
  }

  obtenerUser(){
    return this.authfirebase.currentUser
  }

  stateUser(){
    return this.authfirebase.authState
  }




}
