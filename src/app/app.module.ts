import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module'
import { DialogModule } from 'primeng/dialog'
import { ButtonModule } from 'primeng/button'
import { NgIdleModule } from '@ng-idle/core'
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { RouteGuard } from './shared/guards/route.guard';
import { DirtyGuard } from './shared/guards/dirty.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { JwtInterceptorService } from './shared/services/jwt-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgIdleModule.forRoot(),
    BrowserAnimationsModule,
    DialogModule,
    ButtonModule
  ],
  providers: [
    RouteGuard,
    DirtyGuard,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
    },    
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptorService,
        multi: true
    },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
