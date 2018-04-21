import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnknownErrorRoutingModule } from './unknown-error-routing.module';
import { UnknownErrorComponent } from './unknown-error.component';

@NgModule({
  imports: [
    CommonModule,
    UnknownErrorRoutingModule
  ],
  declarations: [UnknownErrorComponent]
})
export class UnknownErrorModule { }
