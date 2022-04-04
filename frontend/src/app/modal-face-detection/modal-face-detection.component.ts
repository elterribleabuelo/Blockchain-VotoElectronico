import { Component, ElementRef, Input, Output,EventEmitter, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as faceapi from 'face-api.js';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { ProcessFaceService } from '../services/process-face.service';
import { UsuarioService } from '../services/usuario.service';
import { UserI } from '../models/model';
import * as canvas from 'canvas';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import $ from "jquery";
import { ServicioDeFaceDetectionService } from '../services/servicio-de-face-detection.service';
import { Router } from '@angular/router';



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
  selector: 'app-modal-face-detection',
  templateUrl: './modal-face-detection.component.html',
  styleUrls: ['./modal-face-detection.component.scss']
})
export class ModalFaceDetectionComponent implements OnInit {

  //@ViewChild('staticBackdrop') modal: ElementRef;
  @ViewChild('videoContainer',{static:true}) videoContainer!:ElementRef;
  @ViewChild('myCanvas',{static:true}) myCanvas!:ElementRef;

  public context!:CanvasRenderingContext2D;
  public onClose: Subject<boolean>;

  var_code:any;
  dato:any;

  constructor(private auth:AuthService,
    private processFacesSvc:ProcessFaceService,
    private firestore:FirestoreService,
    private usuarioService:UsuarioService,
    private modalRef: BsModalRef,
    private servicioFaceDetection:ServicioDeFaceDetectionService,
    private router:Router,
    private modalService:BsModalService) {}

  ngOnInit(): void {
  }

  detectar(){
    this.main();
  }

  removerVideo(){
    location.reload();
  }

  main = async() =>
  {
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
      const detection = await faceapi.detectSingleFace(this.myCanvas.nativeElement, new faceapi.TinyFaceDetectorOptions())
                        .withFaceLandmarks()
                        .withFaceDescriptor()
      if(typeof detection == 'undefined') return;
      try{
        return this.processFacesSvc.descriptor(detection);
      }catch(error){
        return error
      }
    }



    var refreshIntervalId = setInterval(() => {
        var datos = processFace();
        datos.then((res) => {
          if (res == undefined){
            requestAnimationFrame(reDraw);
            return;
          }else{
            this.var_code = res.code;
            this.detenerSetInterval(refreshIntervalId,res.code,video);
            requestAnimationFrame(reDraw);
          }
        })},4000);
  }


  detenerSetInterval(refreshIntervalId,code,video){
    if (code == 1){
      console.log("Fin del recococimeinto de la imagen. Match exitoso");
      video.getTracks().forEach(function(track) {
        track.stop();
      });
      clearInterval(refreshIntervalId);
      // Pasando el estado del login = true
      this.servicioFaceDetection.disparadoDeFaceDetection.emit({
        stateLogin:true
      })
      // Cerrando el modal
      this.modalRef.hide();
      // Desde madal-face-detection hacia app.component
      this.router.navigate(['/home']);
    }else{
      return;
    }
  }

  async loadAndProcessImagenApi(){
    const path = 'Usuarios';
    const user = await this.auth.obtenerUser();
    const uid = user.uid;
    this.firestore.getDoc<UserI>(path,uid).subscribe(res =>{
      this.usuarioService.getImageBase64(res.dni).subscribe(data =>{
      var imageElement = document.createElement('img');
      imageElement.classList.add('imageElement');
      imageElement.src = data[0].encode_PhotoToBase64;
      imageElement.crossOrigin = 'anonymous';
      console.log("data:",data[0]);
      this.processFacesSvc.processFace(imageElement,res.uid);
      })
    })
  }


  // https://stackoverflow.com/questions/45923088/angular-component-communication
  // https://stackoverflow.com/questions/49780811/how-to-open-modal-that-is-in-child-component-from-parent
  // https://www.youtube.com/watch?v=eEZlv5j3uRQ
  // https://levelup.gitconnected.com/how-to-create-a-reusable-modal-dialog-component-in-angular-8-241cc738d260
  // https://programmerclick.com/article/28401762356/


}  // http      s://stackoverflow.com/questions/66490240/call-one-component-from-another-component
   // https://ng-bootstrap.github.io/#/components/modal/examples
