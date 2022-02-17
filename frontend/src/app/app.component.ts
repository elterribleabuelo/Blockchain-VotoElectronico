import { Component } from '@angular/core';
import { Poll } from './types';
import { PollService } from './poll-service/poll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showForm = false; // Paso 1. Mostrar el formulario de nueva encuesta al clickear
  activePoll:Poll = null;

  // Obtenemos los datos ya sea desde el servicio o desde la Blockchain
  polls = this.ps.getPolls() // Método que viene de poll-services.ts

  constructor(private ps:PollService){

  }

  setActivePoll(poll){
    // Método que sirve para abrir o cerrar encuestas
    // Con esto en el componente de votacion de la encuesta muestra los datos
    this.activePoll = null;
    setTimeout(()=>{
      this.activePoll = poll
    },100);
  }
}
