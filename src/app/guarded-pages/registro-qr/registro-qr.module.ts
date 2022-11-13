import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroQrPageRoutingModule } from './registro-qr-routing.module';

import { RegistroQrPage } from './registro-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroQrPageRoutingModule
  ],
  declarations: [RegistroQrPage]
})
export class RegistroQrPageModule {}
