import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll-service/poll.service';
import { Poll, PollForm, PollVote } from '../types';



@Component({
  selector: 'app-aux-poll-create',
  templateUrl: './aux-poll-create.component.html',
  styleUrls: ['./aux-poll-create.component.scss']
})
export class AuxPollCreateComponent implements OnInit {

  // Obtenemos los datos ya sea desde el servicio o desde la Blockchain
  polls = this.ps.getPolls(); // Método que viene de poll-services.ts

  constructor(private ps:PollService) { }

  ngOnInit(): void {

    this.ps.onEvent("PollCreated").subscribe(() =>{
      this.polls = this.ps.getPolls();
    });

  }

  handlePollCreate(poll:PollForm){
    // poll viene desde app.component.html --> (pollCreated) = "handlePollCreate($event)"
    console.log("Poll desde app.component.ts:", poll);
    this.ps.createPoll(poll); // Llamando al método crearencuesta del servicio

  }

}
