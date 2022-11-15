import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage-service/storage.service';
import { environment } from 'src/environments/environment';
import { ICrearQrResponse } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headerOptions;

  constructor(private http:HttpClient, private storageService: StorageService) {
    this.storageService.getToken()
    .then(token=>{
      this.headerOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`
        })
      }
    })
  }

  registrarCodigoQR(nombreCliente: string, rutCliente: string, qrDataUrl: string): Observable<ICrearQrResponse>{
    //post request para crear un nuevo codigo QR, debe regresar el id del codigo creado para poder crear la url del codigo.
    return this.http.post<ICrearQrResponse>(`${environment.apiBaseUrl}/api`,{nombreCliente,rutCliente,qrDataUrl},this.headerOptions);
  }

  invalidarCodigoQR(){
    //put request para actulizar estado del codigo a 'escaneado' e invalidarlo
  }

  login(){
    //post request para poder validar las credenciales del login y asi obtener token de JWT y acceder a la api
  }

}
