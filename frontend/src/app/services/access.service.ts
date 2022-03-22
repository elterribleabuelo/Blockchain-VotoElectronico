import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  auth = "autorizado";

  constructor(private router:Router) { }

  accesoHome(id:string){
    if(id == 'unknow'){
      return;
    }else{
      localStorage.setItem('uid',id);
      localStorage.setItem('usuario',this.auth);
      console.log("ACCEDIENDO AL HOME DESDE ACCESO HOME");
      this.router.navigate(['/home']);
    }

  }
}
