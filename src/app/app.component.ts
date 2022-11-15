import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from './services/storage-service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private plt:Platform, 
    private storage:Storage, 
    private storageService:StorageService,
    private router:Router) {
    this.plt.ready().then(()=>{
      this.storage.create();
      this.storageService.getRol().then(rol=>{
        if(rol == 'embajador') this.router.navigate(['tabs','registro-qr']);
        else if(rol == 'scanner') this.router.navigate(['tabs','scanner-qr']);
        else this.router.navigate(['/login']);
      })
    })
  }
}