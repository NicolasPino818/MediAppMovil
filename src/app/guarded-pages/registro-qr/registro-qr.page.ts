import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from 'src/app/services/api-service/api.service';
import { Clipboard } from '@capacitor/clipboard';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-registro-qr',
  templateUrl: './registro-qr.page.html',
  styleUrls: ['./registro-qr.page.scss'],
})
export class RegistroQrPage implements OnInit {

  datosClienteForm:FormGroup;
  linkQR:string;
  isSubmit: boolean = false;
  constructor(private alertCtrl: AlertController, private api:ApiService, private toast: ToastController,private storage:StorageService) { }

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

  private async qrAlert(){
    const alert = await this.alertCtrl.create({
      header: 'QR',
      message: 'Ah ocurrido un error al crear el QR',
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


  async clearData(){
    var nombre =<HTMLIonInputElement>document.getElementById('nombre');
    var rut =<HTMLIonInputElement>document.getElementById('rut');
    nombre.value = '';
    rut.value = '';
    this.linkQR = null;
    const toast = await this.toast.create({
      message: 'Datos Limpiados',
      position: 'top',
      duration: 1000
    });

    await toast.present();

  }

  async generarCodigo(){
    if (!this.datosClienteForm.invalid) {
      let emisor: string;
      this.isSubmit = true;
      await this.storage.getUser().then(user=>{
        emisor = user;
      })
      const nomValue = this.datosClienteForm.controls.nombre.value;
      const rutValue = this.datosClienteForm.controls.rut.value;

      let rutFormato = this.formatearRut(rutValue);   
      let fecha_emision = new Date().getDate() +'-'+(new Date().getMonth()+1)+'-'+ new Date().getFullYear();
      let fechas = this.calcularFechaCaducidad();

      this.api.registrarCodigoQR(nomValue,rutFormato,fecha_emision,fechas[0],emisor,fechas[1])
      .subscribe(async (response)=>{
        if(response.blacklist){
          const alert = await this.alertCtrl.create({
            header: 'Blacklist',
            message: 'Esta persona está en la lista negra, no se puede generar codigo',
            buttons: ['Entendido']
          })
          alert.present();
        }else{
          this.linkQR = response.url;
        }
        this.isSubmit = false;
      },(error: HttpErrorResponse)=>{
        this.qrAlert();
        this.isSubmit = false;
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
  calcularFechaCaducidad(){
                  //0        1      2         3          4         5         6
    //let week = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];

    const today = new Date(); //Hoy
    let fecha_caducidad:string;
    let fecha_evento:string;
    var evento:Date;
    var jueves:Date;
    var sabado:Date;
    var viernes:Date;

    switch (today.getDay()) {
      case 0: //Domingo
        console.log('Domingo');
        jueves = new Date(today);
        evento = new Date(today);
        evento.setDate(jueves.getDate() + 3);
        jueves.setDate(jueves.getDate() + 4);

        fecha_evento = `Miercoles ${evento.getDate()}-${(evento.getMonth() + 1)}-${evento.getFullYear()}`;
        fecha_caducidad = `Jueves ${jueves.getDate()}-${(jueves.getMonth() + 1)}-${jueves.getFullYear()} a las 00:00`;
        
        break;
      case 1: //Lunes
        console.log('Lunes');
        jueves = new Date(today);
        evento = new Date(today);
        evento.setDate(jueves.getDate() + 2);
        jueves.setDate(jueves.getDate() + 3);

        fecha_evento = `Miercoles ${evento.getDate()}-${(evento.getMonth() + 1)}-${evento.getFullYear()}`;
        fecha_caducidad = `Jueves ${jueves.getDate()}-${(jueves.getMonth() + 1)}-${jueves.getFullYear()} a las 00:00`;
        
        break;
      case 2: //Martes
        console.log('martes');
        jueves = new Date(today);
        evento = new Date(today);
        evento.setDate(jueves.getDate() + 1);
        jueves.setDate(jueves.getDate()+2);

        fecha_evento = `Miercoles ${evento.getDate()}-${(evento.getMonth() + 1)}-${evento.getFullYear()}`;
        fecha_caducidad = `Jueves ${jueves.getDate()}-${(jueves.getMonth() + 1)}-${jueves.getFullYear()} a las 00:00`;
        
        break;
      case 3: //Miercoles
        console.log('Miercoles');
        jueves = new Date(today);
        evento = new Date(today);
        evento.setDate(jueves.getDate());
        jueves.setDate(jueves.getDate()+1);
        
        fecha_evento = `Miercoles ${evento.getDate()}-${(evento.getMonth() + 1)}-${evento.getFullYear()}`;
        fecha_caducidad = `Jueves ${jueves.getDate()}-${(jueves.getMonth() + 1)}-${jueves.getFullYear()} a las 00:00`;
        
        break;
      case 4: //Jueves
        console.log('Jueves');
        viernes = new Date(today);
        evento = new Date(today);
        evento.setDate(viernes.getDate());
        viernes.setDate(today.getDate()+1);

        fecha_evento = `Jueves ${evento.getDate()}-${(evento.getMonth() + 1)}-${evento.getFullYear()}`;
        fecha_caducidad = `Viernes ${viernes.getDate()}-${(viernes.getMonth() + 1)}-${viernes.getFullYear()} a las 00:00`;
        
        break;
      case 5: //Viernes
        console.log('Viernes');
        sabado = new Date(today);
        evento = new Date(today);
        evento.setDate(sabado.getDate());
        sabado.setDate(sabado.getDate()+1);

        fecha_evento = `Viernes ${evento.getDate()}-${(evento.getMonth() + 1)}-${evento.getFullYear()}`;
        fecha_caducidad = `Sabado ${sabado.getDate()}-${(sabado.getMonth() + 1)}-${sabado.getFullYear()} a las 00:30`;
        
        break;       
      case 6: //Sabado
        console.log('Sabado');
        let domingo = new Date(today);
        evento = new Date(today);
        evento.setDate(domingo.getDate());
        domingo.setDate(domingo.getDate()+1);

        fecha_evento = `Sabado ${evento.getDate()}-${(evento.getMonth() + 1)}-${evento.getFullYear()}`;
        fecha_caducidad = `Domingo ${domingo.getDate()}-${(domingo.getMonth() + 1)}-${domingo.getFullYear()} a las 00:30`; 
        
        break;  
    }

    return [fecha_caducidad,fecha_evento];
  }

  formatearRut(rutValue:string){
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
    return rutFormato;
  }

}
