import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowlModule } from 'primeng/growl'

import { AuthService } from './services/auth.service'

@NgModule({
  imports: [
    CommonModule,
    GrowlModule
  ],
  declarations: [
  ],
  providers: [
    AuthService,
  ],
  exports: [
  ]
})
export class SharedModule { }
