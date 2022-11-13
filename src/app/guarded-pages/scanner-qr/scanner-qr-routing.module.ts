import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScannerQrPage } from './scanner-qr.page';

const routes: Routes = [
  {
    path: '',
    component: ScannerQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScannerQrPageRoutingModule {}
