import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Poll, PollForm, PollVote } from '../types';

import { PollService } from '../poll-service/poll.service';


@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})

// PollCreate component Logic: Lógica del componente
export class PollCreateComponent{

  // Propiedades 1.Forms
  pollForm:FormGroup; // Almacena todas las entradas de nuestro formulario en el constructor


  // Datos de salida de poll-create.component.ts que van hacia app.component.html
  @Output() pollCreated: EventEmitter<PollForm> = new EventEmitter();

  constructor(
    private ps:PollService,
    // 2.Forms
    private fb:FormBuilder,
  ) {
    //3.Forms
    this.pollForm = this.fb.group({
      question : this.fb.control("",[Validators.required]),
      image : this.fb.control(""),
      op1 : this.fb.control(""),
      op2 : this.fb.control(""),
      op3 : this.fb.control("")
    })

   }
   submitForm(){
    const formData:PollForm = {
      question: this.pollForm.get("question").value, // Clave viene del constructor
      thumbnail: this.pollForm.get("image").value,
      options: [
        this.pollForm.get('op1').value,
        this.pollForm.get('op2').value,
        this.pollForm.get('op3').value
      ]
    };

    console.log("FormData desde poll-create.component.ts:", formData); // formData--> JSON con todos los valores llenos

    this.pollCreated.emit(formData); // Creamos el evento y se lo mandamos al formulario app.component.html

    //console.log(this.pollForm.value);
   }
}
