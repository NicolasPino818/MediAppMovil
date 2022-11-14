import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmbajadorAccessGuard } from '../guards/embajador-access/embajador-access.guard';
import { ScannerAccessGuard } from '../guards/scanner-access/scanner-access.guard';

const routes: Routes = [
  {
    path: 'registro-qr',
    canActivate: [EmbajadorAccessGuard],
    loadChildren: () => import('./registro-qr/registro-qr.module').then( m => m.RegistroQrPageModule)
  },
  {
    path: 'scanner-qr',
    canActivate: [ScannerAccessGuard],
    loadChildren: () => import('./scanner-qr/scanner-qr.module').then( m => m.ScannerQrPageModule)
  },
  {
    path: 'listado-codigos',
    loadChildren: () => import('./listado-codigos/listado-codigos.module').then( m => m.ListadoCodigosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
