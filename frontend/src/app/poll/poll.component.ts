import { Component, Input, OnInit } from '@angular/core';
import { Poll, PollForm, PollVote } from '../types';
import { PollService } from '../poll-service/poll.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent{

  @Input() question: string;
  @Input() votes: number[]; //[0,1,5,7]
  @Input() voted: boolean;
  @Input() pollImage:string;

  // Propiedades
  numberOfVotes: number;

  activePoll:Poll = null;

  // Obtenemos los datos ya sea desde el servicio o desde la Blockchain
  polls = this.ps.getPolls(); // Método que viene de poll-services.ts

  constructor(private ps:PollService) {}

  ngOnInit(): void {

    this.ps.onEvent("PollCreated").subscribe(() =>{
      this.polls = this.ps.getPolls();
    });

    //  Hallando el número total de votos
    if(this.votes.length){
      this.numberOfVotes = this.votes.reduce((acc, curr) => {
        // Corrida 1  : acc = 0 , curr = 0 -> acc = 0
        // Corrida 2  : acc = 0 , curr = 1 -> acc = 1
        // Corrida 3  : acc= 1  , curr = 5 -> acc = 6
        // Corrida 4  : acc = 6 , curr = 7 -> acc = 13
        return acc += curr
      })
    }
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
