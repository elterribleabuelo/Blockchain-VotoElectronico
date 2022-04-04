import { Component, ViewChild } from '@angular/core';
import { Poll, PollForm, PollVote } from './types';
import { LoginComponent } from './login/login.component';
import { ModalFaceDetectionComponent } from './modal-face-detection/modal-face-detection.component';
import { PollService } from './poll-service/poll.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import { ServicioDeFaceDetectionService } from './services/servicio-de-face-detection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  login = false;


  sideBarOpen = true;

  activePoll:Poll = null;

  // Obtenemos los datos ya sea desde el servicio o desde la Blockchain
  polls = this.ps.getPolls(); // Método que viene de poll-services.ts


  constructor(private ps:PollService,
    private servicioFaceDetection:ServicioDeFaceDetectionService){
  }

  ngOnInit(): void {

    this.servicioFaceDetection.disparadoDeFaceDetection.subscribe(data => {
      console.log("Recibiendo el estado del login:",data);
      this.login = data.stateLogin;

    })
    this.ps.onEvent("PollCreated").subscribe(() =>{
      this.polls = this.ps.getPolls();
    });
  };

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  receiveStateAuth($event){
    this.login = $event;
  }

  receiveStateAuthLogout($event){
    this.login = $event;
  }




}
