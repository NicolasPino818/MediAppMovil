import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurarPasswordPageRoutingModule } from './restaurar-password-routing.module';

import { RestaurarPasswordPage } from './restaurar-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurarPasswordPageRoutingModule
  ],
  declarations: [RestaurarPasswordPage]
})
export class RestaurarPasswordPageModule {}
