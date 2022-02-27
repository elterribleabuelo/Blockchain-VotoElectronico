import { Component, ViewChild } from '@angular/core';
import { Poll, PollForm, PollVote } from './types';
import { PollService } from './poll-service/poll.service';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sideBarOpen = true;

  activePoll:Poll = null;

  // Obtenemos los datos ya sea desde el servicio o desde la Blockchain
  polls = this.ps.getPolls(); // Método que viene de poll-services.ts


  showForm = false; // Paso 1. Mostrar el formulario de nueva encuesta al clickear

  constructor(private ps:PollService){
  }

  ngOnInit(): void {

    this.ps.onEvent("PollCreated").subscribe(() =>{
      this.polls = this.ps.getPolls();
    });
  };

  handlePollCreate(poll:PollForm){
    // poll viene desde app.component.html --> (pollCreated) = "handlePollCreate($event)"
    console.log("Poll desde app.component.ts:", poll);
    this.ps.createPoll(poll); // Llamando al método crearencuesta del servicio

  }

  handlePollVote(pollVoted:PollVote){
    // pollVoted viene desde app.component.html --> (pollVoted) = "handlePollVote($event)"
    this.ps.vote(pollVoted.id,pollVoted.vote)

    // pollVote.id --> id del JSON que se encuentra en poll.service.ts
    // pollVote.vote --> indice en donde se encuentra el elemento seleccionado en el JSON del poll.service.ts
    // id: 2 -- options:["Enero","Febrero","Marzo"] --> Ex: Si selecciona "Enero" se imprime (2,0)

  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }
}
