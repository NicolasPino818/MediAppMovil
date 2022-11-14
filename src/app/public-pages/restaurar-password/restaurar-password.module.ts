import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurarPasswordPageRoutingModule } from './restaurar-password-routing.module';

import { RestaurarPasswordPage } from './restaurar-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurarPasswordPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RestaurarPasswordPage]
})
export class RestaurarPasswordPageModule {}
