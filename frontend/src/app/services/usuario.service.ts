import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //private BASE_URL = 'http://localhost:4000/users'

  constructor(private http:HttpClient) {
  }

  getUsuarios():Observable<any>{
    return this.http.get('/users');
  }

  getUsuario(dni:string):Observable<any>{
    return this.http.get(`/users/${dni}`)
  }

  crearUsuario(usuario:Object):Observable<any>{
    return this.http.post('/users',usuario)
  }

  getImageBase64(dni:string):Observable<any>{
    return this.http.get(`/users/image_base64/${dni}`)
  }
}
