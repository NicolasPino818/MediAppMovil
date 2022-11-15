import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmbajadorAccessGuard } from 'src/app/guards/embajador-access/embajador-access.guard';
import { ScannerAccessGuard } from 'src/app/guards/scanner-access/scanner-access.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'registro-qr',
        canActivate: [EmbajadorAccessGuard],
        children:[
          {
            path: '',
            loadChildren: () => import('../registro-qr/registro-qr.module').then( m => m.RegistroQrPageModule)
          }
        ]
        
      },
      {
        path: 'scanner-qr',
        canActivate: [ScannerAccessGuard],
        children:[
          {
            path:'',
            loadChildren: () => import('../scanner-qr/scanner-qr.module').then( m => m.ScannerQrPageModule)
          }
        ]
      },
      {
        path: 'listado-codigos',
        canActivate: [EmbajadorAccessGuard],
        children:[
          {
            path:'',
            loadChildren: () => import('../listado-codigos/listado-codigos.module').then( m => m.ListadoCodigosPageModule)
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
