import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('asLogin') login: ElementRef;
  @ViewChild('asRegistrar') registrar: ElementRef;
  @ViewChild('asElegir') elegir:ElementRef;

  constructor(private renderer2:Renderer2) {



  }

  ngOnInit(): void {
  }

  login_fn():void {

    var asLogin = this.login.nativeElement;
    var asRegistrar = this.registrar.nativeElement;
    var asElegir = this.elegir.nativeElement;


    this.renderer2.setStyle(asLogin,'left',"50px");
    this.renderer2.setStyle(asRegistrar,'left',"450px");
    this.renderer2.setStyle(asElegir,'left',"450px");

  }

  registrar_fn(){
    var asLogin = this.login.nativeElement;
    var asRegistrar = this.registrar.nativeElement;
    var asElegir = this.elegir.nativeElement;

    this.renderer2.setStyle(asLogin,'left',"-400px");
    this.renderer2.setStyle(asRegistrar,'left',"50px");
    this.renderer2.setStyle(asElegir,'left',"120px");
}




}
