import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  rol:string;
  constructor(private storageService: StorageService,private router:Router) {
    
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storageService.getRol().then(rol=>{
      this.rol = rol;
    })
  }


  logOut(){
    this.storageService.logOutDestroyData();
    this.router.navigate(['/login']);
  }

}
