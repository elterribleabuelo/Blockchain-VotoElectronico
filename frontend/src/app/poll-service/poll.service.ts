import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Web3Service } from '../blockchain/web3.service';
import { Poll, PollForm } from '../types';
import {fromAscii} from 'web3-utils';


@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private web3:Web3Service) { }

  getPolls():Observable<Poll[]>{
    // Obtenemos las encuestas

    return of([
      {
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
    }]).pipe(delay(2000));

  }

  vote(pollId: number, voteNumber: number){
    // Realiza la votacion en la encuesta
    // Llamando a la funcion "vote" de PollsContract.sol
    this.web3.executeTransaction('vote',pollId,voteNumber);
    console.log("Vote creado en el servicio:",pollId, voteNumber);
  }

  createPoll(poll: PollForm){

    // Llama a la funcion "createPoll" de PollsContract.sol
    this.web3.executeTransaction('createPoll',poll.question,poll.thumbnail || '',poll.options.map(opt => fromAscii(opt)))

    // Crea la encuesta
    console.log("Poll creado en el servicio:", poll);

    // JSON: {question: 'hola que tal', thumbnail: 'https://...,options:["a","b","c"]}
  }
}
