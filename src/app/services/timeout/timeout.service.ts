import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertController, NavController } from '@ionic/angular';
import { StorageService } from '../storage-service/storage.service';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class TimeoutService {

  private t;
  constructor(private storage:StorageService, private nav:NavController,private alert: AlertController) { }

  private async showAlert(){
    const alert = await this.alert.create({
      header: "Sesión",
      message: "Su sesión ha caducado, inicie sesión nuevamente",
      buttons: ['Ok']
    })
    alert.present();
  }

  timeoutStart(timeDiff:number){
    console.log(timeDiff);
    this.t = setTimeout(()=>{
      this.storage.getToken().then(token=>{
        if(token){
          if(helper.isTokenExpired(atob(token))){
            this.storage.logOutDestroyData();
            this.nav.navigateBack(['/login']);
            this.showAlert();
          }
        }
      })
    },timeDiff+5000);
  }
  timeoutStop(){
      clearTimeout(this.t);
  }
}
