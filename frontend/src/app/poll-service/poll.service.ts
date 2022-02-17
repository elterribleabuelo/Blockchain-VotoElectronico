import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Poll } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor() { }

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
    console.log(pollId, voteNumber);
  }

  createPoll(question: string, thumbnail: string, options: string[]){
    // Crea la encuesta
    console.log(question,thumbnail,options);
  }
}
