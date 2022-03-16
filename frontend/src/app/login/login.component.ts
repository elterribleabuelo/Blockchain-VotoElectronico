import { Component, ElementRef, Input, Output,EventEmitter, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserI } from '../models/model';
import { Usuario } from '../models/usuario';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('asLogin') login: ElementRef;
  @ViewChild('asRegistrar') registrar: ElementRef;
  @ViewChild('asElegir') elegir:ElementRef;
  @ViewChild('asDNI') dni:ElementRef;

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
    apellido_materno:null,
    apellido_paterno:null,
    fecha_nacimiento:null,
    url_foto:null,
    correo:null,
    uid:null,
    password:null,
    perfil:'votante'
  }

  usuarioArray:Usuario[] = [];



  constructor(private renderer2:Renderer2, private auth:AuthService,
              private usuarioService:UsuarioService, private router:Router,
              private firestore:FirestoreService){
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

  async registrar_firebase(){
    // Registrando en el módulo de Authentication de Firebase
    const res = await this.auth.registrarUser(this.datos).catch(error => {
      console.log("error")
    })

    if (res) {
      console.log("Exito al crear usuario en Authentication");
      const path = 'Usuarios';
      const id = res.user.uid;
      this.obtener_usuario(this.datos.dni,id)

      try{
        await setTimeout(() => this.firestore.createDoc(this.datos,path,id), 10000);
        console.log("Exito al crear usuario en la Firestore");
        //this.router.navigate(['/home']);
      }catch(error){
        console.log(error);
      }
    }

  }

  obtener_usuario(dni:string,id:string):void{
    this.usuarioService.getUsuario(dni).subscribe(data => {
      //console.log("Data:", data[0])
      this.datos.nombre = data[0].nombre;
      this.datos.apellido_materno =  data[0].apellido_materno;
      this.datos.apellido_paterno = data[0].apellido_paterno;
      this.datos.fecha_nacimiento = data[0].fecha_nacimiento;
      this.datos.url_foto = data[0].url_foto;
      this.datos.uid = id;
      this.datos.password = null;
    })
  }
}
