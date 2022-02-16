import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})

// PollCreate component Logic: Lógica del componente
export class PollCreateComponent{

  // Propiedades 1.Forms
  pollForm:FormGroup; // Almacena todas las entradas de nuestro formulario en el constructor

  constructor(
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
    console.log(this.pollForm.value);
   }
}
