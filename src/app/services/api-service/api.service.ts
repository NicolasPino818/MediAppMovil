import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  registrarCodigoQR(){
    //post request para crear un nuevo codigo QR, debe regresar el id del codigo creado para poder ver la url del codigo.
  }

  invalidarCodigoQR(){
    //put request para actulizar estado del codigo a 'escaneado' e invalidarlo
  }

  login(){
    //post request para poder validar las credenciales del login y asi obtener token de JWT y acceder a la api
  }

}
