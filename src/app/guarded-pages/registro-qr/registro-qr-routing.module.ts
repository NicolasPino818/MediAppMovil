import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroQrPage } from './registro-qr.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroQrPageRoutingModule {}
