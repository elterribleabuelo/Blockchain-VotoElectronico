import { Component } from '@angular/core';
import { Poll } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showForm = false; // Paso 1. Mostrar el formulario de nueva encuesta al clickear
  activePoll:Poll = null;

  // Datos de prueba
  polls:Poll[] = [{
    id: 1,
    question : 'Te gustan los perros o los gatos?',
    thumbnail : 'https://images.pexels.com/photos/7527363/pexels-photo-7527363.jpeg',
    results: [0,5,7],
    options:["Gato","Perro","Ninguno"],
    voted: true,
  },
  {
    id: 2,
    question : 'Cual es el mejor mes para las vacaciones de verano?',
    thumbnail : 'https://images.pexels.com/photos/4577186/pexels-photo-4577186.jpeg',
    results: [1,6,4],
    options:["Enero","Febrero","Marzo"],
    voted: false,
  }];

  setActivePoll(poll){
    // Método que sirve para abrir o cerrar encuestas
    // Con esto en el componente de votacion de la encuesta muestra los datos
    this.activePoll = null;
    setTimeout(()=>{
      this.activePoll = poll
    },100);
  }
}
