import { Component, OnInit } from '@angular/core';
import { UserI } from '../models/model';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  rol:'votante'|'admin' = null;

  constructor(private auth:AuthService,private firestore:FirestoreService) {
    this.auth.stateUser().subscribe(res => {
      if (res){
        console.log('esta logeado');
        this.getDatosUser(res.uid);
      }
      else{
        console.log('no esta logeado');
      }
    })
  }

  ngOnInit(): void {
  }

  getDatosUser(uid:string){
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<UserI>(path,id).subscribe(res =>{
      console.log("datos:",res);
      if (res){
        this.rol = res.perfil
      }
    })

  }

}
