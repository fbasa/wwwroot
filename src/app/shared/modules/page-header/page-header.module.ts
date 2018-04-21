import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header.component';
import { BreadcrumbModule } from 'primeng/breadcrumb'

@NgModule({
  imports: [
    CommonModule,
    BreadcrumbModule
  ],
  declarations: [PageHeaderComponent]
})
export class PageHeaderModule { }
