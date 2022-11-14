import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroQrPageRoutingModule } from './registro-qr-routing.module';

import { RegistroQrPage } from './registro-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroQrPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistroQrPage]
})
export class RegistroQrPageModule {}
