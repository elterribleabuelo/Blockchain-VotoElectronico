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

  async getPolls():Promise<Poll[]>{

    const polls:Poll[] = [];

    // Interractuando con el smart contract

    const totalPolls = await this.web3.call('getTotalPolls'); // numero total de encuestas
    console.log(totalPolls);

    // Parametros
    const acc = await this.web3.getAccount(); // hash de la cuenta de memtamask
    const voter = await this.web3.call('getVoter',acc);

    for (let i = 0; i < totalPolls; i++){
      const poll = await this.web3.call('getPoll',i);
      polls.push(poll);
    }

    return polls;


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
