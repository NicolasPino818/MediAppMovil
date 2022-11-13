import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurarPasswordPage } from './restaurar-password.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurarPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurarPasswordPageRoutingModule {}
