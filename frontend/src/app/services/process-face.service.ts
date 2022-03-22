import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as faceapi from 'face-api.js';
import { AccessService } from './access.service';
import * as canvas from 'canvas';
const { Canvas, Image, ImageData } = canvas


@Injectable({
  providedIn: 'root'
})
export class ProcessFaceService {

  idImage:any;
  imageDescriptors:any = [];
  faceMatcher:any;

  constructor(private http:HttpClient, private router:Router, private accessSvc:AccessService) {

  }

  async processFace(image:any,id:string){
    /**
     * Función que se encarga de procesar la imagen que se envía desde la base de datos o se recoge desde el API
     * Procesada desde login.component.ts
     * Params:
     * image:elemento HTML
     * id: uid recogido desde firebase storage
     */

    console.log("2.Hola desde processFace");
     // Cargamos los modelos
     await faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models');
     await faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models');
     await faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models');

     console.log("2.1.Typeof",typeof image)

    console.log("3.Tipo de dato-imagen que se envía a detectSingleFace:",image); // undefined
    try{
      // Problema esta aquí en lo que regresa detection en pasar el image.nativeElement
      const detection = await faceapi.detectSingleFace(image.nativeElement, new faceapi.TinyFaceDetectorOptions())
                        .withFaceLandmarks()
                        .withFaceDescriptor()
      console.log("4.Detecciones desde process-face.services:",detection);
    }catch(error){
      console.log("5.Error desde process-face.services",error);
    }

    /*if(typeof detection == 'undefined') return;

    this.imageDescriptors.push({
      id:id,
      detection
    });

    console.log("5.imageDescriptors:",this.imageDescriptors);

    this.faceMatcher = new faceapi.FaceMatcher(this.imageDescriptors.map((faceDescriptor:any) => (
      new faceapi.LabeledFaceDescriptors(
        (faceDescriptor.id).toString(),[faceDescriptor.detection.descriptor]
      )
    )))


    console.log("6.Desde metodo asincrono processFace");*/

  }

  descriptor(detection:any){
    const bestMatch = this.faceMatcher.findBestMatch(detection.descriptor);
    console.log("Face Matcher:",bestMatch);
    this.idImage = bestMatch.label;
    this.passwordImg(this.idImage);
  }

  passwordImg(id:string){
    this.accessSvc.accesoHome(id);
  }

}
