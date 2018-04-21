import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { RouteGuard } from '../shared/guards/route.guard';

const routes: Routes = [
  {
    path: '', 
    component: NotFoundComponent,
    canActivate: [RouteGuard]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundRoutingModule { }
