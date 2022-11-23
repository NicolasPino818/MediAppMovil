import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { AlertController, NavController, Platform } from '@ionic/angular';

const helper = new JwtHelperService();



@Injectable({
  providedIn: 'root'
})
export class UserAccessGuard implements CanActivate {

  constructor(private storage: StorageService, private plt:Platform, private navCtrl:NavController, private alertCtrl:AlertController){

  }

  async canActivate() {
    var auth: boolean;
    await this.plt.ready().then(async()=>{
      await this.storage.getToken()
      .then(async token=>{
        if(token){
          let decodedToken = atob(token);
          auth= !helper.isTokenExpired(decodedToken);
          if(helper.isTokenExpired(decodedToken)){
            const alert = await this.alertCtrl.create({
              header: 'Sesión expirada',
              message: 'Su sesión ha caducado, para continuar inicie sesión nuevamente',
              buttons: ['Entendido']
            })
            alert.present();
          }
        }else{
          auth = false;
        }
      })
    })
    if(!auth){
      this.storage.logOutDestroyData();
      this.navCtrl.navigateBack('/login');
    }
    return auth;
  }
}

