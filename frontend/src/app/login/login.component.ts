import { Component, ElementRef, Input, Output,EventEmitter, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserI } from '../models/model';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('asLogin') login: ElementRef;
  @ViewChild('asRegistrar') registrar: ElementRef;
  @ViewChild('asElegir') elegir:ElementRef;

  public toStateLogin:boolean;

  //@Input() received:boolean; // Desde app.component.ts
  @Output() senderStateLogin = new EventEmitter<boolean>();

  credenciales = {
    correo:null,
    password:null
  }

  datos:UserI = {
    dni:null,
    nombre:null,
    apellidos:null,
    fecha_nacimiento:null,
    correo:null,
    uid:null,
    password:null,
    perfil:'votante'
  }

  constructor(private renderer2:Renderer2, private auth:AuthService, private router:Router) {
  }

  ngOnInit(): void {}

  async login_auth(){
    console.log('credenciales -> ',this.credenciales);
    const res = await this.auth.login(this.credenciales.correo,this.credenciales.password).catch((error) =>{
      console.log('error');
    });
    if (res){
      console.log('Ingresando con exito...');
      console.log(res);
      this.senderStateLogin.emit(true);
      this.router.navigate(['/home']);
    }
  }

  login_fn():void {

    var asLogin = this.login.nativeElement;
    var asRegistrar = this.registrar.nativeElement;
    var asElegir = this.elegir.nativeElement;


    this.renderer2.setStyle(asLogin,'left',"50px");
    this.renderer2.setStyle(asRegistrar,'left',"450px");
    this.renderer2.setStyle(asElegir,'left',"450px");

  }

  registrar_fn(){
    var asLogin = this.login.nativeElement;
    var asRegistrar = this.registrar.nativeElement;
    var asElegir = this.elegir.nativeElement;

    this.renderer2.setStyle(asLogin,'left',"-400px");
    this.renderer2.setStyle(asRegistrar,'left',"50px");
    this.renderer2.setStyle(asElegir,'left',"120px");
}

registrar_firebase(){



}




}
