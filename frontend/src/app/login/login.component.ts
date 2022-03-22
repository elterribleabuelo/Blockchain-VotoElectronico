import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, Output,EventEmitter, OnInit, Renderer2, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserI } from '../models/model';
import { Usuario } from '../models/usuario';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { UsuarioService } from '../services/usuario.service';
import * as faceapi from 'face-api.js';
import { ProcessFaceService } from '../services/process-face.service';
import * as canvas from 'canvas';
const { Canvas, Image, ImageData } = canvas;

faceapi.env.monkeyPatch({
  fetch: fetch,
  Canvas: window.HTMLCanvasElement,
  Image: window.HTMLImageElement,
  ImageData: canvas.ImageData,
  createCanvasElement: () => document.createElement('canvas'),
  createImageElement: () => document.createElement('img')
});


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
  @ViewChild('videoContainer',{static:true}) videoContainer!:ElementRef;
  @ViewChild('myCanvas',{static:true}) myCanvas!:ElementRef;

  public context!:CanvasRenderingContext2D;
  public toStateLogin:boolean;
  public url_foto:string;

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
              private usuarioService:UsuarioService,
              private firestore:FirestoreService,private router:Router,
              private http:HttpClient,
              private processFacesSvc:ProcessFaceService){
  }

  ngOnInit(): void {}

  async login_auth(){
    console.log('credenciales -> ',this.credenciales);
    const res = await this.auth.login(this.credenciales.correo,this.credenciales.password).catch((error) =>{
      console.log('error');
    });
    if (res){
      console.log('Ingresando con exito (Con datos del API)...');
      console.log(res);
      console.log("Identificacion Facial ...");
      //this.senderStateLogin.emit(true);
      //this.router.navigate(['/home']);
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
        console.log("Datos finales:", this.datos)
        setTimeout(() => this.firestore.createDoc(this.datos,path,id),10000);
        console.log("Exito al crear usuario en la Firestore");
        this.senderStateLogin.emit(true);
        this.router.navigate(['/home']);
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

  detectar(){
    this.main();
    //this.senderStateLogin.emit(true);
    //this.removerVideo();
  }

  removerVideo(){
    location.reload();
  }

  main = async() => {
    this.context = this.myCanvas.nativeElement.getContext("2d");
    var video = await navigator.mediaDevices.getUserMedia({video:true});

    // Cargamos los modelos
    await faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models');

    // Llamando a la imagen desde el API REST
    this.loadAndProcessImagenApi();

    //Stream de video
    this.videoContainer.nativeElement.srcObject = video;

    //Dibujando
    const reDraw = async()=>{
      this.context.drawImage(this.videoContainer.nativeElement, 0 ,0 , 640, 480);
      requestAnimationFrame(reDraw); // Función que informa al navegador que este haga el pintado de los landmarks
    }

    // Face-api
    const processFace = async() => {
      /**
       * Función que se encarga de procesar la imagen que se envía desde el stream de video
       */
      console.log("7.Tipo de dato-mycanvas:",this.myCanvas);
      console.log("8.Tipo de dato-mycanvas con nativeElement:",this.myCanvas.nativeElement);

      const detection = await faceapi.detectSingleFace(this.myCanvas.nativeElement, new faceapi.TinyFaceDetectorOptions())
                        .withFaceLandmarks()
                        .withFaceDescriptor()
      console.log("9.Detecciones desde login.component.ts:",detection); // JSON
      if(typeof detection == 'undefined') return;
      try{
        this.processFacesSvc.descriptor(detection); // ERROR AQUI
      }catch(error){
        console.log("10.Error en processFace:",error);
      }
    }

    setInterval(processFace,2000);
    requestAnimationFrame(reDraw);
  }

  async loadAndProcessImagenApi(){
    const path = 'Usuarios';
    const user = await this.auth.obtenerUser();
    const uid = user.uid;
    this.firestore.getDoc<UserI>(path,uid).subscribe(res =>{
      this.usuarioService.getImageBase64(res.dni).subscribe(data =>{
      const imageElement = document.createElement('img');
      imageElement.src = data[0].encode_PhotoToBase64;
      imageElement.crossOrigin = 'anonymous';
      //let img = await faceapi.fetchImage(data[0].encode_PhotoToBase64);
      console.log("data:",data[0]);
      this.processFacesSvc.processFace(imageElement,res.uid);
    })
        //setTimeout(() => this.processFacesSvc.processFace(imageElement,res.uid),30000);

    })

  }


  public image2Base64(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }

  getImgBase64(url:string){
    var base64="";
    var img = new canvas.Image();
    img.src=url;
    base64 = this.image2Base64(img);
    console.log("Base 64:",base64);
  }
}
