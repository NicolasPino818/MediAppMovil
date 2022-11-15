import { Component, OnInit, AfterViewInit,OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { IQRDataScanned } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.page.html',
  styleUrls: ['./scanner-qr.page.scss'],
})
export class ScannerQrPage implements OnInit, AfterViewInit, OnDestroy {

  qrData: IQRDataScanned;
  scanActive: boolean = false;
  constructor(private alertCtrl:AlertController) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    BarcodeScanner.prepare();
  }

  ngOnDestroy(): void {
    //console.log('Destroy scanner')
    this.stopScan();
  }

  ionViewWillEnter(){
    //console.log('will enter')
  }

  async startScan(){
    const alowed = await this.checkPermissions();

    if(alowed){
      this.scanActive = true;
      BarcodeScanner.hideBackground(); // make background of WebView transparent

      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      // if the result has content
      if (result.hasContent) {



        this.qrData = JSON.parse(atob(result.content));
        console.log(result.content); // log the raw scanned content
        this.scanActive = false;
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
