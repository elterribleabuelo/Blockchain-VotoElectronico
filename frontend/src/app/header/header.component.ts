import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { UserI } from '../models/model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  @Output() senderStateLoginHeader= new EventEmitter<boolean>();

  username = null;
  foto = null;

  constructor(private auth:AuthService, private router:Router, private firestore:FirestoreService) {

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

  toggleSidebar(){

    this.toggleSidebarForMe.emit();

  }

  logout():void{

    this.auth.logout();
    this.senderStateLoginHeader.emit(false);
    this.router.navigate(['/login']);

  }

  getDatosUser(uid:string){
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<UserI>(path,id).subscribe(res =>{
      console.log("datos:",res);
      if (res){
        this.foto = res.url_foto;
        this.username = res.nombre + ' ' + res.apellido_paterno + ' ' +  res.apellido_materno;
      }
    })

  }



}
