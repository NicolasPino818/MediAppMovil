import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage-service/storage.service';
import { environment } from 'src/environments/environment';
import { ICrearQrRes, IlistadoQr, ILoginResponse, IQRUpdateStatus } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headerOptions:object;
  private header = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }

  constructor(private http:HttpClient, private storageService: StorageService) {
    this.storageService.tokenObs.subscribe(token=>{
      this.headerOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`
        })
      }
    })
  }

  registrarCodigoQR(nom_cli: string, rut_cli: string, fecha_emision: string, fecha_caducidad: string, nom_usuario: string, fecha_evento:string):Observable<ICrearQrRes>{
    //post request para crear un nuevo codigo QR, debe regresar el id del codigo creado para poder crear la url del codigo.
    return this.http.post<ICrearQrRes>(`${environment.apiBaseUrl}/registrar_qr`,{nom_cli,rut_cli,fecha_emision,fecha_caducidad,nom_usuario, fecha_evento},this.headerOptions);
  }

  invalidarCodigoQR(id:string):Observable<IQRUpdateStatus>{
    //put request para actulizar estado del codigo a 'escaneado' e invalidarlo
    return this.http.post<IQRUpdateStatus>(`${environment.apiBaseUrl}/codigo_escaneado/${id}`,this.headerOptions);
  }

  login(usuario:string,password:string): Observable<ILoginResponse>{
    //post request para poder validar las credenciales del login y asi obtener token de JWT y acceder a la api
    let fecha_login = new Date().getDate() +'-'+(new Date().getMonth()+1)+'-'+ new Date().getFullYear();
    let hora_login = ((new Date().getHours()).toString().length == 1 ? '0'+new Date().getHours(): new Date().getHours())+ ':' + ((new Date().getMinutes()).toString().length == 1 ? '0'+new Date().getMinutes(): new Date().getMinutes())  + ':' + new Date().getSeconds();
    return this.http.post<ILoginResponse>(`${environment.apiBaseUrl}/login`, {usuario, password,fecha_login,hora_login}, this.header);
  }

  getListadoQR(usuario:string,fecha:string):Observable<IlistadoQr[]>{
    return this.http.get<IlistadoQr[]>(`${environment.apiBaseUrl}/listado/${usuario}/${fecha}`,this.headerOptions);
  }

}
