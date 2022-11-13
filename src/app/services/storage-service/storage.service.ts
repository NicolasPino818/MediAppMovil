import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const JWT_KEY = 'TOKEN_KEY';
const USER = 'USER';
const PRF_IMG = 'PRF_IMG';
const ROL_KEY = 'ROL'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {}

  setToken(token:string){
    this.storage.set(JWT_KEY,token);
  }
  getToken(): Promise<string> {
    return this.storage.get(JWT_KEY);
  }
  setUser(user:string){
    this.storage.set(USER,user);
  }
  getUser(): Promise<string> {
    return this.storage.get(USER);
  }
  setPrfImg(base64:string){
    this.storage.set(USER,base64);
  }
  getPrfImg(): Promise<string> {
    return this.storage.get(PRF_IMG);
  }
  setRol(rol:string){
    this.storage.set(ROL_KEY,rol);
  }
  getRol(): Promise<string> {
    return this.storage.get(ROL_KEY);
  }

}
