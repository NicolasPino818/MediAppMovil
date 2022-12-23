import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { TimeoutService } from 'src/app/services/timeout/timeout.service';

const helper = new JwtHelperService();



@Injectable({
  providedIn: 'root'
})
export class UserAccessGuard implements CanActivate {

  constructor(private storage: StorageService, 
    private plt:Platform, 
    private navCtrl:NavController, 
    private alertCtrl:AlertController,
    private router:Router,
    private timeout:TimeoutService){

  }

  async canActivate() {
    var auth: boolean;
    await this.plt.ready().then(async()=>{
      await this.storage.getToken()
      .then(async token=>{
        if(token){
          let decodedToken = atob(token);
          if(helper.isTokenExpired(decodedToken)){
            const alert = await this.alertCtrl.create({
              header: 'Sesión expirada',
              message: 'Su sesión ha caducado, para continuar inicie sesión nuevamente',
              buttons: ['Entendido']
            })
            alert.present();
            auth = false;
          }else{
            this.storage.getRol().then(rol=>{
              if(rol == 'embajador') this.router.navigate(['tabs','registro-qr']);
              else if(rol == 'scanner') this.router.navigate(['tabs','scanner-qr']);
              else this.navCtrl.navigateBack('/login');
            })
            this.timer(helper.getTokenExpirationDate(decodedToken));
            auth = true;
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


  timer(expireDate:Date){
    var date1 = new Date(); // current date
    var timeDiff = Math.abs(expireDate.getTime() - date1.getTime());
    this.timeout.timeoutStart(timeDiff);
  }
}

