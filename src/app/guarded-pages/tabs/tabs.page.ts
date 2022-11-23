import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  rol:string;
  constructor(private storageService: StorageService,private navCtrl:NavController) {}

  ionViewWillEnter(){
    this.storageService.getRol().then(rol=>{
      this.rol = rol;
    })
  }


  logOut(){
    this.storageService.logOutDestroyData();
    this.navCtrl.pop();
    this.navCtrl.navigateBack('/login');
  }

}
