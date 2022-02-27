import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Web3Service } from '../blockchain/web3.service';
import { Poll, PollForm } from '../types';
import {fromAscii,toAscii} from 'web3-utils';
import { normalize } from 'path';


@Injectable({
  providedIn: 'root'
})


export class PollService {

  constructor(private web3:Web3Service) { }

  async getPolls():Promise<Poll[]>{

    const polls:Poll[] = [];

    // Interractuando con el smart contract

    const totalPolls = await this.web3.call('getTotalPolls'); // numero total de encuestas
    console.log("Numero total de encuestas desde el servicio:",totalPolls);

    // Parametros
    const acc = await this.web3.getAccount(); // hash de la cuenta de memtamask
    const voter = await this.web3.call('getVoter',acc); // voter => [voters[_id].id, voters[_id].votedIds]
    const voterNormalize = this.normalizeVoter(voter); // valores de voter en formato JSON


    for (let i = 0; i < totalPolls; i++){
      const pollRaw = await this.web3.call('getPoll',i); //pollRaw: tiene forma de arreglo
      const pollNormalized = this.normalizePoll(pollRaw,voterNormalize); //
      polls.push(pollNormalized);
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

  private normalizeVoter(voter){
    return {
      id: voter[0],
      votedIds: voter[1].map(vote => parseInt(vote))
    }
  }

  private normalizePoll(pollRaw,voter):Poll{
    return{

      id: parseInt(pollRaw[0]),
      question:pollRaw[1],
      thumbnail:pollRaw[2],
      results: pollRaw[3].map((vote) => parseInt(vote)),
      options:pollRaw[4].map(opt => toAscii(opt).replace(/\u0000/g,"")),
      voted:
        voter.votedIds.length &&
        voter.votedIds.find(votedId => votedId == parseInt(pollRaw[0])) !=
        undefined,
    }
  }

  onEvent(name:string){
    return this.web3.onEvents(name);
  }
}
