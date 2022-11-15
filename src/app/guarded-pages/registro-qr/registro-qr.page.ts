import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import QRCode from 'qrcode';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from 'src/app/services/api-service/api.service';
import { ICrearQrResponse } from 'src/app/interfaces/interfaces';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-registro-qr',
  templateUrl: './registro-qr.page.html',
  styleUrls: ['./registro-qr.page.scss'],
})
export class RegistroQrPage implements OnInit {

  datosClienteForm:FormGroup;
  linkQR:string;
  constructor(private alertCtrl: AlertController, private api:ApiService, private toast: ToastController) { }

  ngOnInit() {
    this.datosClienteForm = new FormGroup({
      nombre: new FormControl('',[
        Validators.required
      ]),
      rut: new FormControl('',[
        Validators.required,
        Validators.pattern('^([1-9]{1}[0-9]{0,1})(([0-9]+){3})(([0-9]+){3})-[0-9kK]{1}$')
      ])
    })
  }

  private async datosAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Datos',
      message: 'Asegurese de llenar todos los datos',
      buttons: ['Entendido']
    })
    alert.present();
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Link Copiado al Porta Papeles',
      position: 'top',
      icon: 'copy-outline',
      duration: 3000
    });

    await toast.present();
  }

  generarCodigo(){

    const nomValue = this.datosClienteForm.controls.nombre.value;
    const rutValue = this.datosClienteForm.controls.rut.value;

    if (!this.datosClienteForm.invalid) {
      let rutFormato:string;

      if(rutValue.length == 9){
        let rutmill = rutValue.slice(0,1);
        let rutpart1 = rutValue.slice(1,4); 
        let rutpart2 = rutValue.slice(4,7);
        let rutDv = rutValue.slice(7).toString();
        rutFormato = rutmill + "."+ rutpart1 + "." + rutpart2 + rutDv.toLowerCase();
      }else{
        let rutmill = rutValue.slice(0,2);
        let rutpart1 = rutValue.slice(2,5); 
        let rutpart2 = rutValue.slice(5,8);
        let rutDv = rutValue.slice(8).toString();
        rutFormato = rutmill + "."+ rutpart1 + "." + rutpart2 + rutDv.toLowerCase();
      }

      let qrData = `Nombre: ${nomValue}, Rut: ${rutFormato}, Estado: Valido`;

      QRCode.toDataURL(qrData)
      .then(url => {
        this.linkQR = 'http://mediterraneo.cl/mi-codigo/123456'
        this.api.registrarCodigoQR(nomValue,rutFormato,url)
        .subscribe((response: ICrearQrResponse)=>{

        },(error: HttpErrorResponse)=>{

        })
      })
      .catch(err => {
        console.error(err)
      })
    }
    else this.datosAlert();
  }

  async copyLink(){
    await Clipboard.write({
      string: this.linkQR
    });
    this.presentToast();
  }

}
