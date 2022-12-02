import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertController, NavController } from '@ionic/angular';
import { StorageService } from '../storage-service/storage.service';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private storage: StorageService,
    private alertCtrl:AlertController,
    private nav:NavController) { }


  async checkExpiredToken(){
    await this.storage.getToken()
    .then(async token=>{
      if(token){
        let decodedToken = atob(token);
        if(helper.isTokenExpired(decodedToken)){
          this.nav.navigateBack('/login');
          const alert = await this.alertCtrl.create({
            header: 'Sesión expirada',
            message: 'Su sesión ha caducado, para continuar inicie sesión nuevamente',
            buttons: ['Entendido']
          })
          alert.present();
        }
      }
    })
  }
}
