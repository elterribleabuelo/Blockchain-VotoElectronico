import { AfterViewInit, Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import ApexCharts from 'apexcharts';
import { PollVote } from '../types';
//import { EventEmitter } from 'stream';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.scss']
})
export class PollVoteComponent implements AfterViewInit {
  /** Params
   * voted: Booleano que indica si la persona a votado o no en dicha encuesta
   * options: Opciones de la encuesta
   * results: resultados de la votacion
   * question: Pregunta formulada
   */

  // Datos de entrada que van desde app.component.ts hacia poll-vote.component.ts
  @Input() voted:boolean; // Recojemos la variable del app.component.ts
  @Input() options: string[];
  @Input() results: number[];
  @Input() question:string;
  @Input() id:number;

  // Datos de salida que van desde poll-vote.component.ts hacia app.component.html
  @Output() pollVoted: EventEmitter<PollVote> = new EventEmitter(); // indica


  voteForm: FormGroup;

  // Emitiendo valores hacia app.component.ts
  //@Output() pollCreated: EventEmitter = new EventEmitter();

  constructor(private fb:FormBuilder) {
    // Llenando el voteForm de acuerdo a lo seleccionado en el radiogroup
    this.voteForm = this.fb.group({
      selected:this.fb.control("",[Validators.required]),
    });
  }

  ngAfterViewInit(): void {
    if (this.voted){
      // Si ha votado se genera la vista con graficos de los resultados
      this.generateChart();
    }
  }

  submitForm(){
    const pollVoted: PollVote = {
      id: this.id,
      vote: this.voteForm.get("selected").value, // opcion por la que voto
    };

    // Generando el evento para que se registre el voto
    this.pollVoted.emit(pollVoted); // Creamos el evento y se lo mandamos al formulario app.component.html

    // console.log("Desde submitForm() poll-vote.component.ts : ", this.voteForm.value); // JSON: {selected:2}
  }

  generateChart(){
    const options:ApexCharts.ApexOptions = {
      series: [
        {
          data:this.results,
        },
      ],

      chart:{
        height: 350,
        type: 'bar'
      },
      plotOptions:{
        bar:{
          columnWidth:'45%',
          distributed: true
        }
      },
      legend:{
        show:false,
      },
      xaxis:{
        categories:this.options,
      }
    };

    const chart = new ApexCharts(document.getElementById('poll-results'),options);
    chart.render()
  }

}
