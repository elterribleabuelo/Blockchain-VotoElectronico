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


  constructor(private ps:PollService){
  }

  ngOnInit(): void {

    this.ps.onEvent("PollCreated").subscribe(() =>{
      this.polls = this.ps.getPolls();
    });
  };


  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }
}
