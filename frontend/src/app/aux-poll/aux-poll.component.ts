import { Component, OnInit } from '@angular/core';
import { Poll, PollForm, PollVote } from '../types';
import { PollService } from '../poll-service/poll.service';


@Component({
  selector: 'app-aux-poll',
  templateUrl: './aux-poll.component.html',
  styleUrls: ['./aux-poll.component.scss']
})
export class AuxPollComponent implements OnInit {

  activePoll:Poll = null;

  // Obtenemos los datos ya sea desde el servicio o desde la Blockchain
  polls = this.ps.getPolls(); // Método que viene de poll-services.ts

  constructor(private ps:PollService) { }

  ngOnInit(): void {
  }

  handlePollVote(pollVoted:PollVote){
    // pollVoted viene desde app.component.html --> (pollVoted) = "handlePollVote($event)"
    this.ps.vote(pollVoted.id,pollVoted.vote)

    // pollVote.id --> id del JSON que se encuentra en poll.service.ts
    // pollVote.vote --> indice en donde se encuentra el elemento seleccionado en el JSON del poll.service.ts
    // id: 2 -- options:["Enero","Febrero","Marzo"] --> Ex: Si selecciona "Enero" se imprime (2,0)

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
