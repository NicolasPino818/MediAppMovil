import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoCodigosPageRoutingModule } from './listado-codigos-routing.module';

import { ListadoCodigosPage } from './listado-codigos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoCodigosPageRoutingModule
  ],
  declarations: [ListadoCodigosPage]
})
export class ListadoCodigosPageModule {}
