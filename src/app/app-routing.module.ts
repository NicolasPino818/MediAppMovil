import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserAccessGuard } from './guards/user-access/user-access.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./public-pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'restaurar-password',
    loadChildren: () => import('./public-pages/restaurar-password/restaurar-password.module').then( m => m.RestaurarPasswordPageModule)
  },
  {
    path: 'tabs',
    canActivate: [UserAccessGuard],
    loadChildren: () => import('./guarded-pages/tabs/tabs.module').then(m => m.TabsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
