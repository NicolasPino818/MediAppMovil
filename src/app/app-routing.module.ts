import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserAccessGuard } from './guards/user-access/user-access.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
    path: 'app',
    canActivate: [UserAccessGuard],
    loadChildren: () => import('./guarded-pages/pages-routing.module').then( m => m.PagesRoutingModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
