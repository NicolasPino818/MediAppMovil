import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'registro-qr',
    loadChildren: () => import('./registro-qr/registro-qr.module').then( m => m.RegistroQrPageModule)
  },
  {
    path: 'scanner-qr',
    loadChildren: () => import('./scanner-qr/scanner-qr.module').then( m => m.ScannerQrPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
