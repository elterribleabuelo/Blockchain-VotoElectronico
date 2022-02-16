import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showForm = false; // Paso 1. Mostrar el formulario de nueva encuesta al clickear

  // Datos de prueba
  polls = [{
    question : 'Te gustan los perros o los gatos?',
    image : 'https://images.pexels.com/photos/7527363/pexels-photo-7527363.jpeg',
    votes: [0,5,7],
    voted: true,
  },
  {
    question : 'Cual es el mejor mes para las vacaciones de verano?',
    image : 'https://images.pexels.com/photos/4577186/pexels-photo-4577186.jpeg',
    votes: [1,6,4],
    voted: true,
  }];
}
