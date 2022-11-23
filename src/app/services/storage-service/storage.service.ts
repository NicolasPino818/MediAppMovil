import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

const JWT_KEY = 'TOKEN_KEY';
const USER = 'USER';
const PRF_IMG = 'PRF_IMG';
const ROL_KEY = 'ROL'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  tokenObs = new BehaviorSubject(null);
  constructor(private storage: Storage,private plt:Platform) {
    this.plt.ready().then(()=>{
      this.getToken().then(token=>{
        if(token){
          this.tokenObs.next(atob(token));
        }
      })
    })
  }

  setToken(token:string){
    this.tokenObs.next(token);
    this.storage.set(JWT_KEY,btoa(token));
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

  logOutDestroyData(){
    this.storage.remove(ROL_KEY);
    this.storage.remove(PRF_IMG);
    this.storage.remove(USER);
    this.storage.remove(JWT_KEY);
  }

}
