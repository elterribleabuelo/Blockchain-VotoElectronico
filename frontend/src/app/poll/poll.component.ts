import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  @Input() question: string;
  @Input() votes: number[]; //[0,1,5,7]
  @Input() voted: boolean;
  @Input() pollImage:string;

  // Propiedades
  numberOfVotes: number;

  constructor() {
   }

  ngOnInit(): void {
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

}
