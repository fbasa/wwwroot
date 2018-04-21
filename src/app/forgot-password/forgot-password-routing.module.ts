import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';
import { DirtyGuard } from '../shared/guards/dirty.guard';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
    canDeactivate: [DirtyGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
