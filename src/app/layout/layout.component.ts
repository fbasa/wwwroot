import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { routerTransition, slideInOut } from '../route.animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [routerTransition(),slideInOut()]
})
export class LayoutComponent implements OnInit {


  menuActive: boolean;
    
  activeMenuId: string;

  constructor(private router : Router) {

  }

  ngOnInit() {

  }

  changeTheme(event: Event, theme: string) {
    let themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
    themeLink.href = 'assets/components/themes/' + theme + '/theme.css';
    event.preventDefault();
  }

  onMenuButtonClick(event: Event) {
    this.menuActive = !this.menuActive;
    event.preventDefault();
  }

  sidebarState:string = 'in';
 
  toggleMenu() {
    this.sidebarState = this.sidebarState === 'out' ? 'in' : 'out';
  }

}

