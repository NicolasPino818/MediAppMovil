import { Component, OnInit, AfterViewInit,OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, ToastController } from '@ionic/angular';
import { IQRDataScanned } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.page.html',
  styleUrls: ['./scanner-qr.page.scss'],
})
export class ScannerQrPage implements OnInit, AfterViewInit, OnDestroy {

  qrData: IQRDataScanned;
  scanActive: boolean = false;
  constructor(private alertCtrl:AlertController,private api:ApiService,private toast:ToastController) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    BarcodeScanner.prepare();
  }

  ngOnDestroy(): void {
    this.stopScan();
  }

  async escaneadoAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Escaneado',
      message: "Este codigo ya ha sido escaneado antes",
      buttons: ['Ok']
    })
    alert.present();
  }

  public admitirEntrada(id:string){
    this.api.invalidarCodigoQR(id).subscribe(async res=>{
      if(res.updatedStatus == '1'){
        const toast = await this.toast.create({
          duration: 1500,
          message: 'QR actualizado a "Escaneado"',
          icon: 'qr-code-outline',
          position: 'top'
        })
        toast.present();
        this.qrData = null;
      }
    })
  }

  async startScan(){
    const alowed = await this.checkPermissions();

    if(alowed){
      this.scanActive = true;
      BarcodeScanner.hideBackground(); // make background of WebView transparent

      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      // if the result has content
      if (result.hasContent) {
        let content: IQRDataScanned = JSON.parse(atob(result.content));

        if(content.escaneado == '1') this.escaneadoAlert();
        else this.qrData = content;
        //console.log(result.content); // log the raw scanned content
        this.stopScan();
      }else{
        this.stopScan();
      }
    }
  }

  private async checkPermissions(){
    
    return new Promise(async (resolve,reject)=>{
      const status = await BarcodeScanner.checkPermission({force:true});
      if (status.granted) {
        resolve(status.granted);
      }else if(status.denied){
        const alert = await this.alertCtrl.create({
          header: 'Permisos',
          message: 'Para poder escanear codigos se necesitan permisos de camara',
          buttons: [
            {
              text: 'No',
              role: 'cancel'
            },
            {
              text: 'Abrir configuracion',
              handler: ()=>{
                
                BarcodeScanner.openAppSettings();
                resolve(false);
              }
            }
          ]
        })
        alert.present();
      }else{
        resolve(false);
      }
    })
  }

  stopScan(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

}
