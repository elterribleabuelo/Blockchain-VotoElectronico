import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import ApexCharts from 'apexcharts';

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
  // Datos de entrada desde app.component
  @Input() voted:boolean; // Recojemos la variable del app.component.ts
  @Input() options: string[];
  @Input() results: number[];
  @Input() question:string;


  voteForm: FormGroup;

  constructor(private fb:FormBuilder) {
    this.voteForm = this.fb.group({
      selected:this.fb.control("",[Validators.required]),
    });
  }

  ngAfterViewInit(): void {
    if (this.voted){
      // Si ha votado se genera la vista con graficos
      this.generateChart();
    }
  }

  submitForm(){
    console.log(this.voteForm.value);
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
