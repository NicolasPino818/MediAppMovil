import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IlistadoQr } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api-service/api.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { Clipboard } from '@capacitor/clipboard';
import { ToastController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global-service/global.service';

@Component({
  selector: 'app-listado-codigos',
  templateUrl: './listado-codigos.page.html',
  styleUrls: ['./listado-codigos.page.scss'],
})
export class ListadoCodigosPage implements OnInit {

  listado: IlistadoQr[];
  date = new Date();
  fecha = this.date.getDate() +'-'+(this.date.getMonth()+1)+'-'+ this.date.getFullYear();

  

  refreshed:boolean = false;

  constructor(
    private api:ApiService,
    private storage:StorageService,
    private toast:ToastController,
    private globalService:GlobalService) { }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Link Copiado al Porta Papeles',
      position: 'top',
      icon: 'copy-outline',
      duration: 3000
    });

    await toast.present();
  }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.refreshed = true;
    this.storage.getUser().then(usuario=>{
      if(usuario){
        this.api.getListadoQR(usuario,this.fecha).subscribe((res)=>{
          if(res){
            this.listado = res;
          }
        },(error:HttpErrorResponse)=>{
          console.log(error);
        })
      }
    })
    setTimeout(()=>{
      this.refreshed = false;
    },2000);
  }

  async copyLink(link:string){
    await Clipboard.write({
      string: link
    });
    this.presentToast();
  }

}
