import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoCodigosPage } from './listado-codigos.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoCodigosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoCodigosPageRoutingModule {}
